import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Connection, In, Repository } from 'typeorm';
import { SchoolChargePayment } from './entities/school-charge-payment.entity';
import { QuerySchoolPaymentBilling } from '../../school-payments/interfaces/InvoiceSchoolPayment.interface';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';
import { SchoolChargesMethodsPayments } from '../school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import { QuerySimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { User } from '../../../system/users/entities/user.entity';
import * as moment from 'moment';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { SimpleReportCollege } from './reports/simple.report';
import { NotInvoiced } from '../../../common/interface/not-invoiced.interface';
import { FormaPago } from '@signati/core/lib/signati/types/Catalogs/FormaPago';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { InvoiceGlobalEnum } from '../../../common/enums/InvoiceGlobal.enum';
import { InvoiceStatus } from '../../../invoice/types/invoice-status';
import { SchoolChargesInvoice } from '../school-charges-invoice/entities/school-charges-invoice.entity';
import { XmlComprobante } from '@signati/core';
import { readFileSync, writeFileSync } from 'fs';
import { PDF, XmlToJson } from '@signati/pdf';
import { A117 } from '../../../pdf/A117/desing/A117';
import { ConfigService } from '../../../common/config/config.service';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import {sumQuantity} from '../../../common/point-of-sale/point-of-sale';
import {IQueryReportSchoolPayment} from './types/IReport';

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

    getHighestPayment(formadepago: SchoolChargesMethodsPayments[]) {
        const methodpaymenst = formadepago.sort((a, b) => {
            return a.quantity - b.quantity;
        });

        return methodpaymenst[0];
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

        const highestPayment = this.getHighestPayment(payment.methodsPayments);
        return {
            charge,
            payment,
            highestPayment,
        };
    }

    async updatePayment(data: SchoolChargePayment) {
        let payment = await this.repo.findOne({id: data.id});
        payment = {...data};
        return await this.repo.save(payment);
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
                                 }: IQueryReportSchoolPayment): Promise<NotInvoiced[]> {
        let queryString = `SELECT * FROM vw_sch_payments where p_created_at BETWEEN '${startDate}' AND '${endDate}' AND v_status = 2`;

        if(status){
            queryString = `${queryString} AND p_state = ${status}`;
        }
        if(cycleId){
            queryString = `${queryString} AND v_cycle = ${cycleId}`;
        }
        if(branchOfficeId){
            queryString = `${queryString} AND bf_id_branch_office = ${branchOfficeId}`;
        }
        if(codigoPago){
            queryString = `${queryString} AND f_metodo_pago_codigo = ${codigoPago}`;
        }
        if(usersIds && usersIds.length > 0){
            const user = usersIds.map((u) => {return parseInt(`${u}`)})
            if(status && status == 4){
                queryString = `${queryString} AND cancelation_id in (${user.join(',')})`;
            }else {queryString = `${queryString} AND cashier_id in (${user.join(',')})`;}
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
                                            }: IQueryReportSchoolPayment): Promise<NotInvoiced[]> {
        let queryString = `SELECT * FROM vw_sch_payments where f_created_at BETWEEN '${startDate}' AND '${endDate}' AND f_folio is not null`;

        if(status){
            queryString = `${queryString} AND f_status = ${status}`;
        }
        if(cycleId){
            queryString = `${queryString} AND v_cycle = ${cycleId}`;
        }
        if(branchOfficeId){
            queryString = `${queryString} AND bf_id_branch_office = ${branchOfficeId}`;
        }
        if(codigoPago){
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

    public async simpleReport(payments: SchoolChargePayment[], sales: SchoolCharge[], query: any, options?: { base64: boolean }): Promise<string | any> {
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
            FROM vw_sch_payments vw
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
        const data: NotInvoiced[] = await this.connection.query(`
            SELECT *
            FROM vw_sch_payments vw
            WHERE (vw.f_status IS NULL OR vw.f_status = '0')
              AND vw.p_stamping = '0'
              AND vw.v_status = '2'
              AND vw.p_state != '4'
              AND vw.p_income > 0
              AND vw.p_created_at BETWEEN '${query.startDate}' AND '${query.endDate}';
        `);

        data.forEach((value: NotInvoiced) => {
            value.p_income = parseFloat(`${value.p_income}`)
        });

        return data
    }

    public async getWayPayment(payments: NotInvoiced[]): Promise<FormaPago> {
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

    public async updateStampingPayments(ids: number[], uuid: string): Promise<any> {
        try {
            return this.connection.query(`
                UPDATE school_charge_payments p
                SET stamping = 1, globalUuid = '${uuid}'
                WHERE p.id IN (${ids.join(',')});
            `);
        } catch (e) {
            throw new NotFoundException('Error updating payments to invoiced');
        }
    }

    public async saveXmlAndPdf(uuid: string, xml: string, address: string): Promise<XmlComprobante> {
        try {
            const logo = readFileSync(`${this.configService.getPath()}logos/colegiologo.png`);

            const path = `${this.configService.getPath()}comprobantes/colegio/${uuid}.xml`;

            writeFileSync(path, xml);

            const cfdi = await XmlToJson(path);

            const desingpdf = new A117(path, {
                lugarExpedicion: address,
                logo: `data:image/png;base64, ${logo.toString('base64')}`,
            });

            const pdf = new PDF<A117>(desingpdf);

            await pdf.save(`${this.configService.getPath()}comprobantes/colegio/${uuid}`);

            return cfdi['cfdi:Comprobante'] as XmlComprobante;
        } catch (e) {
            throw new NotFoundException('Could not save xml or pdf');
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
        const pathInvoice = `${this.configService.getPath()}comprobantes/tienda/` + uuid.toUpperCase();
        const mailOptions: Mail.Options = {
            to: email,
            from: currentBranch.Email,
            subject: 'Tienda  - Comprobantes de pago CFDI',
            text: 'CFDI',
            html: '<div> <h2>Gracias por su compra</h2><br><p>Adjuntos, le enviamos su factura electrónica y archivo XML</p><br><br></div>',
            attachments: [
                {
                    filename: uuid.toUpperCase() + '.xml',
                    path: `${pathInvoice}.xml`,
                },
                {
                    filename: uuid.toUpperCase() + '.pdf',
                    path: `${pathInvoice}.pdf`,
                },
            ],
        };
        return await transporter.sendMail(mailOptions);
    }
}
