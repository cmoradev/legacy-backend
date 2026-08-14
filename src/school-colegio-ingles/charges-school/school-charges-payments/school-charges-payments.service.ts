import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Connection, DeepPartial, In, Repository } from 'typeorm';
import { SchoolChargePayment } from './entities/school-charge-payment.entity';
import { QuerySchoolPaymentBilling } from '../../school-payments/interfaces/InvoiceSchoolPayment.interface';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';
import {
    SchoolChargesMethodsPayments
} from '../school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import {
    QuerySimpleReport
} from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { User } from '../../../system/users/entities/user.entity';
import * as moment from 'moment';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { SimpleReportCollege } from './reports/simple.report';
import { NotInvoiced, VWPaymentExtraCharge } from '../../../common/interface/not-invoiced.interface';
import { FormaPagoEnum } from '@munyaal/cfdi';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { InvoiceGlobalEnum } from '../../../common/enums/InvoiceGlobal.enum';
import { InvoiceStatus } from '../../../invoice/types/invoice-status';
import { SchoolChargesInvoice } from '../school-charges-invoice/entities/school-charges-invoice.entity';
import { catRegimenFiscal } from '@munyaal/cfdi-catalogs';
import { ConfigService } from '../../../common/config/config.service';
import { S3Service } from '../../../common/storage/s3.service';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { roundQuantity, sumQuantity } from '../../../common/point-of-sale/point-of-sale';
import { IQueryReportSchoolPayment } from './types/IReport';
import { IQueryReportSaleTodayOp } from '../../../mini-store/store-sales/mini-store-sales/types/IReport';
import { InvoiceModules } from "../../../common/point-of-sale/types.pos";
import { Recibo } from "../../../common/pdfmake/Recibo";
import { AttachmentsType } from "../../../types";
import { ReceiptTemplate } from "../../../templates/receipt";
import { CancellationDto } from '../../../common/dto/Cancellation.dto';
import { AuthService } from '../../../system/auth/auth.service';
import { PaymentStatus } from '../../../common/enums/PaymentStatus';
import { ConceptsByDetailsSale } from '../../../common/cancellation/concepts';
import { SchoolPayment } from '../../school-payments/entities/school-payment.entity';
import { Decimal } from '@munyaal/calculations';
import { saleDetailsCalculations } from '../../../common/utils/report/sales.calculation';
import { SalePaymentDto } from '../../../common/dto/sale-payment.dto';
import { getHighestPayment } from './utils';


@Injectable()
export class SchoolChargesPaymentsService extends TypeOrmCrudService<SchoolChargePayment> {
    constructor(
        @InjectRepository(SchoolChargePayment, ColegioDBNameConnection)
        readonly repo: Repository<SchoolChargePayment>,
        @InjectRepository(SchoolChargesInvoice, ColegioDBNameConnection)
        readonly invoiceRepository: Repository<SchoolChargesInvoice>,
        @InjectRepository(SchoolCharge, ColegioDBNameConnection)
        readonly schoolChargeRepo: Repository<SchoolCharge>,
        @InjectRepository(User, ColegioDBNameConnection) readonly userRepository: Repository<User>,
        @InjectRepository(InvoiceMethodPayment, ColegioDBNameConnection) readonly invoiceMethodPaymentRepository: Repository<InvoiceMethodPayment>,
        private readonly configService: ConfigService,
        @InjectConnection(ColegioDBNameConnection) private connection: Connection,
        private readonly authService: AuthService,
        private readonly s3Service: S3Service
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({id}, {withDeleted: true});
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.restore(id);
    }

    async findSaleByPayment(query: QuerySchoolPaymentBilling): Promise<{
        charge: SchoolCharge,
        payment: SchoolChargePayment,
        highestPayment: SchoolChargesMethodsPayments
    }> {
        const charge = await this.schoolChargeRepo.findOne({
            where: {
                id: query.chargeId,
            },
            relations: [
                'chargesDetails',
                'chargesDetails.schoolPlanPayment',
                'chargesDetails.extraCharges',
            ],
        });

        const payment = await this.repo.createQueryBuilder('payment')
            .withDeleted()
            .leftJoinAndSelect('payment.methodsPayments', 'methodsPayments')
            .leftJoinAndSelect('methodsPayments.Bank', 'Bank')
            .leftJoinAndSelect('methodsPayments.invoiceMethodPayment', 'invoiceMethodPayment')
            .innerJoinAndSelect('payment.cashierCharge', 'cashierCharge')
            .andWhere('payment.id = :idp', {idp: query.chargePaymentId})
            .getOne();

        const highestPayment = getHighestPayment(payment.methodsPayments);
        return {
            charge,
            payment,
            highestPayment,
        };
    }

    async fetchFilteredPayments(query: QuerySimpleReport) {
        const paymentsQueryBuilder = this.repo.createQueryBuilder('payment');
        paymentsQueryBuilder.leftJoinAndSelect('payment.schoolPaymentOffice', 'schoolPaymentOffice');
        paymentsQueryBuilder.leftJoinAndSelect('payment.cashierCharge', 'cashierCharge');
        paymentsQueryBuilder.leftJoinAndSelect('payment.schoolCharge', 'schoolCharge');
        paymentsQueryBuilder.leftJoinAndSelect('schoolCharge.schoolStudent', 'schoolStudent');
        paymentsQueryBuilder.leftJoinAndSelect('payment.methodsPayments', 'methodsPayments');
        paymentsQueryBuilder.leftJoinAndSelect('methodsPayments.invoiceMethodPayment', 'invoiceMethodPayment');
        paymentsQueryBuilder.leftJoinAndSelect('payment.schoolChargesInvoice', 'schoolChargesInvoice');
        paymentsQueryBuilder.orderBy('payment.id', 'DESC');
        if (query) {
            paymentsQueryBuilder.andWhere('payment.paymentStatus= :paymentStatus', {
                paymentStatus: query.status,
            });

            paymentsQueryBuilder.andWhere('payment.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.invoiceStatus) {
                paymentsQueryBuilder.andWhere('payment.stamping = :invoiceStatus', {invoiceStatus: query.invoiceStatus});
            }
            if (query.cashier) {
                paymentsQueryBuilder.andWhere('cashierCharge.id = :agentID', {agentID: query.cashier});
            }
        }
        return paymentsQueryBuilder.getMany();
    }

    fetchFilteredSales(query: QuerySimpleReport) {
        const salesQueryBuilder = this.schoolChargeRepo.createQueryBuilder('charge');
        salesQueryBuilder.leftJoinAndSelect('charge.schoolCampus', 'schoolCampus');
        salesQueryBuilder.leftJoinAndSelect('charge.cashier', 'cashier');
        salesQueryBuilder.leftJoinAndSelect('charge.schoolStudent', 'schoolStudent');
        salesQueryBuilder.leftJoinAndSelect('charge.chargesPayments', 'chargesPayments');
        salesQueryBuilder.leftJoinAndSelect('charge.chargesDetails', 'chargesDetails');
        salesQueryBuilder.leftJoinAndSelect('chargesDetails.extraCharges', 'extraCharges');
        salesQueryBuilder.leftJoinAndSelect('chargesDetails.schoolPlanPayment', 'schoolPlanPayment');
        if (query) {
            salesQueryBuilder.andWhere('chargesPayments.paymentStatus= :paymentStatus', {
                paymentStatus: query.status,
            });
            salesQueryBuilder.andWhere('chargesPayments.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.cashier) {
                salesQueryBuilder.andWhere('cashier.id = :agentID', {agentID: query.cashier});
            }
        }
        return salesQueryBuilder.getMany();
    }

    public async getUserCasher(): Promise<User[]> {
        const cashiersAndSales = await this.userRepository.find({
            relations: ['schoolChargesPayments', 'department'],
            select: ['id', 'name'],
        });
        const cashiers = cashiersAndSales.filter(cashier => {
            if (cashier.department !== null && cashier.department.id === 2 || cashier.schoolChargesPayments.length > 0) {
                return cashier;
            }
        });
        return cashiers;
    }

    public async reportSchoolPayment({
                                         status,
                                         startDate,
                                         endDate,
                                         cycleId,
                                         branchOfficeId,
                                         codigoPago,
                                         usersIds,
                                     }: IQueryReportSchoolPayment): Promise<VWPaymentExtraCharge[]> {
        let queryString = `SELECT *
                           FROM vw_sch_payments
                           where p_created_at BETWEEN '${startDate}' AND '${endDate}'
                             AND v_status = 2`;

        if (status) {
            queryString = `${queryString} AND p_state = ${status}`;
        }
        if (cycleId) {
            queryString = `${queryString} AND v_cycle = ${cycleId}`;
        }
        if (branchOfficeId) {
            queryString = `${queryString} AND v_branch_office = ${branchOfficeId}`;
        }
        if (codigoPago) {
            queryString = `${queryString} AND p_metodo_pago_codigo = ${codigoPago}`;
        }
        if (usersIds && usersIds.length > 0) {
            const user = usersIds.map((u) => {
                return parseInt(`${u}`)
            })
            if (status && status == 4) {
                queryString = `${queryString} AND p_cancelation_id in (${user.join(',')})`;
            } else {
                queryString = `${queryString} AND p_cashier_id in (${user.join(',')})`;
            }
        }
        try {
            return this.connection.query(queryString);
        } catch (e) {
            throw new NotFoundException(
                `Error in query or conection [${queryString}]`,
            );
        }
    }

    public async reportSchoolPaymentInvoice({
                                                status,
                                                startDate,
                                                endDate,
                                                cycleId,
                                                branchOfficeId,
                                                codigoPago,
                                            }: IQueryReportSchoolPayment): Promise<VWPaymentExtraCharge[]> {
        let queryString = `SELECT *
                           FROM vw_sch_payments
                           where f_created_at BETWEEN '${startDate}' AND '${endDate}'
                             AND p_income > 0
                             AND v_status = 2`;

        if (status) {
            queryString = `${queryString} AND f_status = ${status}`;
        }
        if (cycleId) {
            queryString = `${queryString} AND v_cycle = ${cycleId}`;
        }
        if (branchOfficeId) {
            queryString = `${queryString} AND v_branch_office = ${branchOfficeId}`;
        }
        if (codigoPago) {
            queryString = `${queryString} AND f_metodo_pago_codigo = ${codigoPago}`;
        }
        try {
            return this.connection.query(queryString);
        } catch (e) {
            throw new NotFoundException(
                `Error in query or conection [${queryString}]`,
            );
        }
    }

    public async reportSalesSchool({
                                       startDate,
                                       endDate,
                                       cycleId,
                                       branchOfficeId,
                                   }: IQueryReportSaleTodayOp): Promise<VWPaymentExtraCharge[]> {
        let queryString = `SELECT *
                           FROM vw_sch_sales
                           where v_created_at BETWEEN '${startDate}' AND '${endDate}'
                             AND v_status = 2`;

        if (cycleId) {
            queryString = `${queryString} AND v_cycle = ${cycleId}`;
        }
        if (branchOfficeId) {
            queryString = `${queryString} AND v_branch_office = ${branchOfficeId}`;
        }
        try {
            return this.connection.query(queryString);
        } catch (e) {
            throw new NotFoundException(
                `Error in query or conection [${queryString}]`,
            );
        }
    }

    public async simpleReport(payments: SchoolChargePayment[], sales: SchoolCharge[], query: any, options?: {
        base64: boolean
    }): Promise<string | any> {
        const cashiersAndSales = await this.userRepository.find({
            relations: ['schoolChargesPayments', 'department', 'role'],
        });
        const paymentMethods = await this.invoiceMethodPaymentRepository.find({
            where: {
                showReport: true,
                isActive: true,
            },
        });
        const cashiers = cashiersAndSales.filter(cashier => {
            if (cashier.role.id === 5 && cashier.department.id === 2 || cashier.schoolChargesPayments.length > 0) {
                return cashier;
            }
        });
        const workbook = new SimpleReportCollege().generate({
            payments,
            cashiers,
            paymentMethods,
            sales,
            query,
        });
        try {
            const fileName = (+new Date()).toString() + '.xlsx';
            if (options && options.base64) {
                const result = await workbook.xlsx.writeBuffer({
                        filename: (+new Date()).toString() + '.xlsx',
                    },
                );
                const buffer = Buffer.from(result);
                const b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
                return b64Encoding + buffer.toString('base64');

            } else {
                await workbook.xlsx.writeFile('./xls-imports/' + fileName);
                return fileName;
            }
        } catch (e) {
            return e;
        }
    }

    public async getGlobalInvoiceFromSales(query: NotInvoicedDto): Promise<any> {
        const billedPayments: NotInvoiced[] = [];
        const unbilledPayments: NotInvoiced[] = [];
        let totalUnbilledPayments = 0;
        let totalBilledPayments = 0;
        let invoice: SchoolChargesInvoice[] | null = null;

        const data: NotInvoiced[] = await this.connection.query(`
            SELECT *
            FROM vw_my_sch_payments vw
            WHERE vw.v_status = '2'
              AND vw.p_income > 0
              AND vw.p_state != '4'
              AND vw.p_created_at BETWEEN '${query.startDate}' AND '${query.endDate}';
        `);

        data.forEach((value: NotInvoiced) => {
            value.p_income = parseFloat(`${value.p_income}`);

            if ((value.f_status === null || value.f_status === '0') && (value.p_stamping === '0' || value.p_stamping === 0)) {
                unbilledPayments.push(value);

                totalUnbilledPayments = sumQuantity(totalUnbilledPayments, value.p_income);
            } else {
                billedPayments.push(value);

                totalBilledPayments = sumQuantity(totalBilledPayments, value.p_income);
            }
        });

        if (billedPayments.length) {
            const uuids = billedPayments.map((value) => value.p_global_uuid).filter((value) => value);

            invoice = await this.invoiceRepository.find({
                where: {
                    uuid: In(uuids)
                }
            });
        }

        return {
            billedPayments,
            unbilledPayments,
            totalBilledPayments,
            totalUnbilledPayments,
            invoice
        };
    }

    public async notInvoiced(query: NotInvoicedDto): Promise<NotInvoiced[]> {
        const qr = `
            SELECT *
            FROM vw_my_sch_payments vw
            WHERE (vw.f_status IS NULL OR vw.f_status = '0')
              AND vw.p_stamping = '0'
              AND vw.v_status = '2'
              AND vw.p_state != '4'
          AND vw.p_income > 0
          AND vw.p_created_at BETWEEN '${query.startDate}' AND '${query.endDate}'
        `
        const data: NotInvoiced[] = await this.connection.query(query.ids && query.ids.length
            ? `${qr} AND vw.p_id IN (${query.ids.join(',')});`
            : `${qr};`);

        data.forEach((value: NotInvoiced) => {
            value.p_income = parseFloat(`${value.p_income}`)
        });

        return data
    }

    public async getWayPayment(payments: NotInvoiced[]): Promise<FormaPagoEnum> {
        const ids = payments.map<number>((value) => value.p_id);

        const data = await this.connection.query(`
            SELECT vw.p_way, SUM(vw.p_ingreso) as p_total
            FROM vw_sch_way_payments vw
            WHERE vw.p_id IN (${ids.join(', ')})
            GROUP BY vw.p_way;
        `);

        const way = data?.[0]?.p_way;

        if (!way) {
            throw new NotFoundException('Way Payments not exists');
        } else {
            return way;
        }
    }

    public async getGlobalInvoice(branchOffice: BranchOffice, branchOfficeConfig: BranchOfficeSetting): Promise<SchoolChargesInvoice> {
        const finded = await this.invoiceRepository.findOne({
            where: {
                isGlobal: `${InvoiceGlobalEnum.IS_GLOBAL}`,
                status: `${InvoiceStatus.Unbilled}`,
                invoiceBranchOffice: {id: branchOffice.id},
                invoiceBranchOfficeSet: {id: branchOfficeConfig.id},
            }
        });

        if (finded?.id) {
            return finded;
        } else {
            const payload = new SchoolChargesInvoice();
            payload.folio = '';
            payload.uuid = '';
            payload.businessName = 'PUBLICO EN GENERAL';
            payload.rfc = 'XAXX010101000';
            payload.status = InvoiceStatus.Unbilled;
            payload.isGlobal = InvoiceGlobalEnum.IS_GLOBAL;
            payload.invoiceBranchOffice = {id: branchOffice.id} as BranchOffice;
            payload.invoiceBranchOfficeSet = {id: branchOfficeConfig.id} as BranchOfficeSetting;
            const invoice = await this.invoiceRepository.save(payload);

            return this.invoiceRepository.findOne({
                where: {id: invoice.id}
            })
        }
    }

    async sendMail(currentBranch: BranchOffice, uuid: string, email: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: currentBranch.Email,
                pass: currentBranch.EmailPass,
            },
        });
        const folder = 'comprobantes/tienda';
        const xmlBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toLowerCase()}.xml`);
        const pdfBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toLowerCase()}.pdf`);
        const mailOptions: Mail.Options = {
            to: email,
            from: currentBranch.Email,
            subject: 'Tienda  - Comprobantes de pago CFDI',
            text: 'CFDI',
            html: '<div> <h2>Gracias por su compra</h2><br><p>Adjuntos, le enviamos su factura electrónica y archivo XML</p><br><br></div>',
            attachments: [
                {
                    filename: uuid.toUpperCase() + '.xml',
                    content: xmlBuffer,
                },
                {
                    filename: uuid.toUpperCase() + '.pdf',
                    content: pdfBuffer,
                },
            ],
        };
        return await transporter.sendMail(mailOptions);
    }

    public async detailsInvoiceByUuid(params: {
        uuid: string
    }) {
        const result = this.repo
            .createQueryBuilder('payment')
            .leftJoinAndSelect('payment.schoolCharge', 'schoolCharge')
            .leftJoinAndSelect('schoolCharge.chargesDetails', 'chargesDetails')
            .leftJoinAndSelect('chargesDetails.extraCharges', 'extraCharges')
            .select([
                'payment.id',
                'payment.folio',
                'payment.globalUuid',
                'schoolCharge.id',
                'schoolCharge.folio',
                'chargesDetails',
                'extraCharges'
            ])
            .where('payment.globalUuid = :UUID', {
                UUID: params.uuid,
            });
        return await result.getMany();
    }

    public async createReceipt(result: any, branchOfficeSett: any, student: any, invoiceDetails: any) {

        const Receip = new Recibo();

        Receip.setType(InvoiceModules.SCHOOL);

        const logo = await this.s3Service.getLogo('logos/colegiologo.png');

        if (logo) {
            Receip.addLogo({
                width: 100,
                height: 100,
                image: `data:image/png;base64, ${logo.toString('base64')}`,
            });
        }


        Receip.addFolio(result.payment.folio);

        Receip.addDate(moment(result.payment.createdAt).format('YYYY-MM-DD'));

        const regimen = catRegimenFiscal.find(
            (f) => f.key === String(branchOfficeSett.regime),
        );

        if (regimen !== undefined) {
            Receip.addEmisor({
                name: branchOfficeSett.businessName,
                rfc: branchOfficeSett.rfc,
                regimen:
                    branchOfficeSett.regime + ' - ' + regimen !== undefined ? regimen!.description.toUpperCase() : '',
                expedido: branchOfficeSett.address,
            });
        }

        const name = `${student.name} ${student.lastNameFather} ${student.lastNameMother} `;

        Receip.addReceptor({
            name,
            curp: student.curp ? student.curp : '',
            matricula: student.matricula,
            type: InvoiceModules.SCHOOL
        });

        const ven =
            result.payment.cashierCharge.name +
            ' ' +
            result.payment.cashierCharge.lastnameFather +
            ' ' +
            result.payment.cashierCharge.lastnameMother;

        Receip.addInformacion({
            vendedor: ven,
        });

        Receip.addCatidad({
            ...invoiceDetails.totals.receipt
        });

        Receip.addDetalles(invoiceDetails.concepts.conceptsSchoolAndAcademy);

        Receip.addNumberToLetter(+invoiceDetails.totals.receipt.Total);

        Receip.addObervations(result.payment.observations);

        const forma = result.payment.methodsPayments.map((m) => {
            return {
                forma: m.invoiceMethodPayment.name,
                cantidad: roundQuantity(m.quantity),
                banco: m.Bank ? m.Bank.name : '',
                cuenta: m.account,
                fecha: m.date,
            };
        });

        Receip.addFormaPago(forma);

        return Receip
    }

    async sendReceipt(branch: BranchOffice, attachments: AttachmentsType[], email: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: branch.Email,
                pass: branch.EmailPass,
            },
        });

        const mailOptions: Mail.Options = {
            to: email,
            from: branch.Email,
            subject: 'Confirmación de Pago y Envío de Comprobante',
            html: ReceiptTemplate,
            attachments,
        };

        return await transporter.sendMail(mailOptions);
    }

    public async cancelPayment(id: number, payload: CancellationDto) {

        try {

            const object = await this.findOne(id);

            if (!object) {
                throw new NotFoundException('Pago colegio no encontrado')
            }

            if (object.paymentStatus === PaymentStatus.Cancelled) {
                throw new BadRequestException('El pago ya está cancelado');
            }

            const { reasonCancellation} = payload;

            const user = await this.authService.validateUserCancellation(payload);

            return await this.connection.transaction(async (manager) => {
                
                const conceptIds = await ConceptsByDetailsSale({id, type: 'payment', tpv: InvoiceModules.SCHOOL, manager})

                await manager.update(
                    SchoolPayment,
                    {id: In(conceptIds)},
                    { 
                        statusPayment: PaymentStatus.Abonar,
                        paidDate: new Date()
                    }
                );

                const result = await this.repo.update({id}, {
                    reasonCancellation,
                    dateCancellation: new Date(),
                    paymentStatus: PaymentStatus.Cancelled,
                    cashierChargeCancellation: {id: user.id}
                });

                if(result && result.affected && result.affected > 0) {
                    return id;
                }else {
                    throw new BadRequestException(`Error al cancelar el pago colegio ${id}`);    
                }
            });

        } catch (e) {
            if (e?.status === 401) throw new UnauthorizedException('Credenciales de administrador incorrecta');

            console.error(`Error al cancelar pago colegio ${id}: ${e}`);

            throw new BadRequestException(`Error al cancelar el pago colegio ${id}`);
        }
    }

    public async addPayment(
    payload: SalePaymentDto,
  ): Promise<SchoolChargePayment> {
    try {
      return await this.connection.transaction(async (manager) => {
        const charge = await manager.findOne(SchoolCharge, {
          where: { id: payload.saleId },
          relations: [
            'chargesDetails',
            'chargesDetails.extraCharges',
            'chargesDetails.schoolPlanPayment',
            'chargesPayments',
          ],
        });

        if (!charge) {
          throw new NotFoundException(
            `Venta colegio ${payload.saleId} no encontrada`,
          );
        }

        if (charge.status === PaymentStatus.Cancelled) {
          throw new BadRequestException(
            `La venta colegio ${payload.saleId} está cancelada`,
          );
        }

        const totalPayment = Decimal.sub(payload.quantity, payload.change).toNumber();

        const previousPayments = charge.chargesPayments.filter(
          (p) => p.paymentStatus === PaymentStatus.PaiOut,
        );

        let previousTotal = 0;
        previousPayments.forEach((p) => {
          previousTotal = Decimal.sum(previousTotal,  Decimal.sub(p.quantity, p.change)).toNumber();
          
        });

        const saleInvoiceDetails = saleDetailsCalculations({
          details: charge.chargesDetails,
          type: InvoiceModules.SCHOOL,
        });

        const saleTotal = saleInvoiceDetails.total;

        
        const methodsSubTotal = payload.methodsPayments.reduce(
          (acc, m) => sumQuantity(acc, m.quantity),
          0,
        );

        const methodsTotal = Decimal.sub(methodsSubTotal, payload.change).toNumber();

        if (methodsTotal !== totalPayment) {
          throw new BadRequestException(
            `La suma de métodos de pago (${methodsTotal}) no coincide con el monto del pago (${totalPayment})`,
          );
        }

        
        const newTotalPaid = sumQuantity(previousTotal, totalPayment);

        if (newTotalPaid > saleTotal) {
          throw new BadRequestException(
            `El monto total de pagos (${newTotalPaid}) excede el total de la venta (${saleTotal})`,
          );
        }

        const methodsPayments: DeepPartial<
          SchoolChargesMethodsPayments
        >[] = payload.methodsPayments.map((method) => {
          const {
            Bank,
            date,
            quantity,
            codePaymentMethod,
            invoiceMethodPayment,
          } = method;

          return {
            date,
            quantity,
            codePaymentMethod,
            invoiceMethodPayment: { id: invoiceMethodPayment.id },
            Bank: Bank ? { id: Bank.id } : null,
          };
        });

        const newPayment: DeepPartial<SchoolChargePayment> = {
            cashierCharge: { id: payload.cashier },
            schoolCharge: { id: payload.saleId },
            schoolPaymentOffice: { id: payload.paymentOfficeId },
            schoolPaymentOfficeSet: { id: payload.paymentOfficeSetId },
            totalWithCharges: payload.total.totalWithCharges,
            totalWithoutCharges: payload.total.totalWithoutCharges,
            totalDiscount: payload.total.totalDiscount,
            totalSurcharges: payload.total.totalSurcharges,
            quantity: payload.quantity,
            change: payload.change,
            isIVA: false,
            observations: payload.observations,
            paymentStatus: PaymentStatus.PaiOut,
            methodsPayments,
        };

        const savedPayment = await manager.save(
          SchoolChargePayment,
          newPayment,
        );

        
        const conceptIds = charge.chargesDetails
          .filter((d) => d.schoolPlanPayment && d.schoolPlanPayment.id)
          .map((d) => d.schoolPlanPayment.id);

        if (conceptIds.length > 0) {

          if (newTotalPaid >= saleTotal) {
        
            await manager.update(
              SchoolPayment,
              { id: In(conceptIds) },
              {
                statusPayment: PaymentStatus.PaiOut,
                paidDate: new Date(),
              },
            );
          } else {
            
            await manager.update(
              SchoolPayment,
              { id: In(conceptIds) },
              {
                statusPayment: PaymentStatus.Abonar,
                paidDate: new Date(),
              },
            );
          }
        }

        return savedPayment;
      });
    } catch (e) {
      if (e?.status) throw e;

      console.error(
        `Error al agregar pago a venta colegio ${payload.saleId}: ${e}`,
      );

      throw new BadRequestException(
        `Error al agregar pago a la venta colegio ${payload.saleId}`,
      );
    }
  }
}
