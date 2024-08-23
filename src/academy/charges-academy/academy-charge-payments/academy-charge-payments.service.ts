import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Connection, In, Repository } from 'typeorm';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';
import {
    QuerySimpleReport
} from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { User } from '../../../system/users/entities/user.entity';
import { AcademyCharge } from '../academy-charge/entities/academy-charge.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { SimpleReportAcademy } from './reports/simple.report';
import { QueryBillingAcademy } from './types/InvoiceAcademy.interface';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import {
    AcademyChargeMethodsPayments
} from '../academy-charge-methods-payments/entities/academy-charge-methods-payments.entity';
import { ConfigService } from '../../../common/config/config.service';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { NotInvoiced, VWPaymentExtraCharge } from '../../../common/interface/not-invoiced.interface';
import { FormaPago } from '@signati/core/lib/signati/types/Catalogs/FormaPago';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { InvoiceGlobalEnum } from '../../../common/enums/InvoiceGlobal.enum';
import { InvoiceStatus } from '../../../invoice/types/invoice-status';
import { AcademyChargeInvoice } from '../academy-charge-invoice/entities/academy-charge-invoice.entity';
import { RegimenFiscalList, XmlComprobante } from '@signati/core';
import { readFileSync, writeFileSync } from 'fs';
import { PDF, XmlToJson } from '@signati/pdf';
import { A117 } from '../../../pdf/A117/desing/A117';
import { roundQuantity, sumQuantity } from '../../../common/point-of-sale/point-of-sale';
import { IQueryReportAcademiaPayment } from './types/IReports';
import { Recibo } from "../../../common/pdfmake/Recibo";
import { InvoiceModules } from "../../../common/point-of-sale/types.pos";
import moment = require('moment');
import { AttachmentsType } from "../../../types";
import { ReceiptTemplate } from "../../../templates/receipt";

@Injectable()
export class AcademyChargePaymentsService extends TypeOrmCrudService<AcademyChargePayments> {
    constructor(
        @InjectRepository(AcademyChargePayments, ColegioDBNameConnection) readonly repo: Repository<AcademyChargePayments>,
        @InjectRepository(User, ColegioDBNameConnection) readonly userRepository: Repository<User>,
        @InjectRepository(InvoiceMethodPayment, ColegioDBNameConnection) readonly invoiceMethodPaymentRepository: Repository<InvoiceMethodPayment>,
        @InjectRepository(AcademyCharge, ColegioDBNameConnection) readonly academyRepository: Repository<AcademyCharge>,
        @InjectRepository(AcademyChargeInvoice, ColegioDBNameConnection) readonly invoiceRepository: Repository<AcademyChargeInvoice>,
        @InjectConnection(ColegioDBNameConnection) private connection: Connection,
        private readonly configService: ConfigService,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({id}, {withDeleted: true});
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.restore(id);
    }

    async fetchFilteredPayments(query: QuerySimpleReport): Promise<AcademyChargePayments[]> {
        const paymentsQueryBuilder = this.repo.createQueryBuilder('payment');
        paymentsQueryBuilder.leftJoinAndSelect('payment.academyPaymentOffice', 'academyPaymentOffice');
        paymentsQueryBuilder.leftJoinAndSelect('payment.cashierCharge', 'cashierCharge');
        paymentsQueryBuilder.leftJoinAndSelect('payment.academyCharge', 'academyCharge');
        paymentsQueryBuilder.leftJoinAndSelect('academyCharge.schoolStudent', 'schoolStudent');
        paymentsQueryBuilder.leftJoinAndSelect('payment.methodsPayments', 'methodsPayments');
        paymentsQueryBuilder.leftJoinAndSelect('methodsPayments.invoiceMethodPayment', 'invoiceMethodPayment');
        paymentsQueryBuilder.leftJoinAndSelect('payment.academyChargesInvoice', 'academyChargesInvoice');
        if (query) {

            paymentsQueryBuilder.where('academyPaymentOffice.id= :officeId', {
                officeId: query.branchOfficeId,
            });

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
        return await paymentsQueryBuilder.getMany();
    }

    async fetchFilteredSales(query: QuerySimpleReport): Promise<AcademyCharge[]> {
        const salesQueryBuilder = this.academyRepository.createQueryBuilder('charge');
        salesQueryBuilder.leftJoinAndSelect('charge.chargeCampus', 'chargeCampus');
        salesQueryBuilder.leftJoinAndSelect('charge.cashier', 'cashier');
        salesQueryBuilder.leftJoinAndSelect('charge.schoolStudent', 'schoolStudent');
        salesQueryBuilder.leftJoinAndSelect('charge.chargesPayments', 'chargesPayments');
        salesQueryBuilder.leftJoinAndSelect('charge.chargesDetails', 'chargesDetails');
        salesQueryBuilder.leftJoinAndSelect('chargesDetails.extraCharges', 'extraCharges');
        salesQueryBuilder.leftJoinAndSelect('chargesDetails.academyInscriptionConcept', 'academyInscriptionConcept');
        if (query) {
            salesQueryBuilder.where('chargeCampus.id= :officeId', {
                officeId: query.branchOfficeId,
            });
            salesQueryBuilder.andWhere('chargesPayments.paymentStatus= :paymentStatus', {
                paymentStatus: query.status,
            });
            /*if (query.invoiceStatus) {
                salesQueryBuilder.andWhere('payments.stamping= :invoiceStatus', {
                        invoiceStatus: query.invoiceStatus,
                    },
                );
            }*/
            salesQueryBuilder.andWhere('chargesPayments.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.cashier) {
                salesQueryBuilder.andWhere('cashier.id = :agentID', {agentID: query.cashier});
            }
        }
        return await salesQueryBuilder.getMany();
    }

    public async getUserCasher(): Promise<User[]> {
        const cashiersAndSales = await this.userRepository.find({
            relations: ['salePayments', 'department'],
            select: ['id', 'name'],
        });
        const cashiers = cashiersAndSales.filter(cashier => {
            if (cashier.department !== null && cashier.department.id === 2 || cashier.salePayments.length > 0) {
                return cashier;
            }
        });
        return cashiers;
    }

    async simpleReport(payments: AcademyChargePayments[], sales: AcademyCharge[], options?: {
        base64: boolean
    }): Promise<string | any> {

        const cashiersAndSales = await this.userRepository.find({
            relations: ['academyChargesPayments', 'department', 'role'],
        });
        const paymentMethods = await this.invoiceMethodPaymentRepository.find({
            where: {
                showReport: true,
                isActive: true,
            },
        });

        const cashiers = cashiersAndSales.filter(cashier => {
            if (cashier.role.id === 5 && cashier.department.id === 2 || cashier.academyChargesPayments.length > 0) {
                return cashier;
            }
        });

        const workbook = new SimpleReportAcademy().generate({
            payments,
            cashiers,
            paymentMethods,
            sales,
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

    async findSaleByPayment(query: QueryBillingAcademy): Promise<{
        charge: AcademyCharge,
        payment: AcademyChargePayments,
        highestPayment: AcademyChargeMethodsPayments
    }> {
        const charge = await this.academyRepository.findOne({
            where: {
                id: query.chargeId,
            },
            relations: [
                'chargesDetails',
                'chargesDetails.academyInscriptionConcept',
                'chargesDetails.extraCharges',
                'schoolStudent'
            ],
        });

        const payment = await this.repo.findOne({
            where: {
                id: query.chargePaymentId,
            },
            relations: [
                'methodsPayments',
                'methodsPayments.invoiceMethodPayment',
                'cashierCharge'
            ],
        });

        return {
            charge,
            payment,
            highestPayment: this.getHighestPayment(payment.methodsPayments),
        };
    }

    getHighestPayment(formadepago: AcademyChargeMethodsPayments[]) {
        const methodpaymenst = formadepago.sort((a, b) => {
            return a.quantity - b.quantity;
        });

        return methodpaymenst[0];
    }

    async updatePayment(data: AcademyChargePayments) {
        let payment = await this.repo.findOne({id: data.id});
        payment = {...data};
        return await this.repo.save(payment);
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
        const pathInvoice = `${this.configService.getPath()}comprobantes/academias/` + uuid.toUpperCase();
        const mailOptions: Mail.Options = {
            to: email,
            from: currentBranch.Email,
            subject: 'Academias  - Comprobantes de pago CFDI',
            text: 'CFDI',
            html: '<div> <h2>Gracias por su pago</h2><br><p>Adjuntos, le enviamos su factura electrónica y archivo XML</p><br><br></div>',
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

    async countTotalPayments(dateStart: string, dateEnd: string, ciclyId: number, branchOfficeId: number) {
        return await this.repo.createQueryBuilder('payments')
            .leftJoinAndSelect('payments.academyPaymentOffice', 'academyPaymentOffice', 'academyPaymentOffice.id=:branchOfficeId', {branchOfficeId})
            .leftJoinAndSelect('payments.academyCharge', 'academyCharge')
            .leftJoinAndSelect('academyCharge.chargeCycle', 'chargeCycle', 'chargeCycle.id=:cycleId', {cycleId: ciclyId})
            .select('SUM(payments.quantity-payments.change)', 'sum')
            .where(`DATE(payments.createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'`)
            .getRawOne();
    }

    public async getGlobalInvoiceFromSales(query: NotInvoicedDto): Promise<any> {
        const billedPayments: NotInvoiced[] = [];
        const unbilledPayments: NotInvoiced[] = [];
        let totalUnbilledPayments = 0;
        let totalBilledPayments = 0;
        let invoice: AcademyChargeInvoice[] | null = null;

        const data: NotInvoiced[] = await this.connection.query(`
            SELECT *
            FROM vw_my_aca_payments vw
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
            totalUnbilledPayments,
            totalBilledPayments,
            invoice
        };
    }

    public async notInvoiced(query: NotInvoicedDto): Promise<NotInvoiced[]> {
        const qr = `
            SELECT *
            FROM vw_my_aca_payments vw
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

    public async getWayPayment(payments: NotInvoiced[]): Promise<FormaPago> {
        const ids = payments.map<number>((value) => value.p_id);

        const data = await this.connection.query(`
            SELECT vw.p_way, SUM(vw.p_ingreso) as p_total
            FROM vw_aca_way_payments vw
            WHERE vw.p_id IN (${ids.join(', ')})
            GROUP BY vw.p_way;
        `);

        const way = data?.[0]?.p_way;

        if (!way) {
            throw new NotFoundException('Concepts not exists');
        } else {
            return way;
        }
    }

    public async getGlobalInvoice(branchOffice: BranchOffice, branchOfficeConfig: BranchOfficeSetting): Promise<AcademyChargeInvoice> {
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
            const payload = new AcademyChargeInvoice();
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
                UPDATE ac_charge_payments p
                SET stamping   = 1,
                    globalUuid = '${uuid}'
                WHERE p.id IN (${ids.join(',')});
            `);
        } catch (e) {
            throw new NotFoundException('Error updating payments to invoiced');
        }
    }

    public async saveXmlAndPdf(uuid: string, xml: string, address: string): Promise<XmlComprobante> {
        try {
            const logo = readFileSync(`${this.configService.getPath()}logos/academiaslogo.png`);

            const path = `${this.configService.getPath()}comprobantes/academias/${uuid}.xml`;

            writeFileSync(path, xml);

            const cfdi = await XmlToJson(path);

            const desingpdf = new A117(path, {
                lugarExpedicion: address,
                logo: `data:image/png;base64, ${logo.toString('base64')}`,
            });

            const pdf = new PDF<A117>(desingpdf);

            await pdf.save(`${this.configService.getPath()}comprobantes/academias/${uuid}`);

            return cfdi['cfdi:Comprobante'] as XmlComprobante;
        } catch (e) {
            throw new NotFoundException('Could not save xml or pdf');
        }
    }

    public async reportAcademiaPayment({
                                           status,
                                           startDate,
                                           endDate,
                                           cycleId,
                                           branchOfficeId,
                                           codigoPago,
                                           usersIds,
                                       }: IQueryReportAcademiaPayment): Promise<VWPaymentExtraCharge[]> {
        let queryString = `SELECT
            p.id AS p_id,
            f.id AS f_id,
            v.id AS v_id,
            v.folio AS v_folio,
            p.folio AS p_folio,
            CASE 
				WHEN f.folio IS NOT NULL THEN f.folio
				WHEN p.globalUuid IS NOT NULL THEN 'Folio global'
            ELSE 'N/A' END AS f_folio,
            CASE 
				WHEN f.status IS NOT NULL THEN f.status
                WHEN p.globalUuid IS NOT NULL THEN 'Estatus global'
			ELSE 'N/A' END AS f_status,
            f.uuid AS f_uuid,
            f.rfc AS f_rfc,
            f.invoiceType AS f_type,
            p.quantity AS p_quantity,
            p.change AS p_change,
            v.observaciones AS v_observaciones,
            CAST((p.quantity - p.change) AS DECIMAL(12,6)) AS p_income,
            a.id AS a_id,
            a.id_modalidad AS a_type,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            p.academyPaymentOfficeId AS v_branch_office,
            v.ciclo AS v_cycle,
            v.id_estado_pago AS v_status,
            p.createdAt AS p_created_at,
            f.createdAt AS f_created_at,
            p.stamping AS p_stamping,
            p.paymentStatusId AS p_state,
            (select p_way_name from vw_aca_way_payments where p.id = f.id Limit 1) AS f_metodo_pago,
            (select p_way from vw_aca_way_payments where p.id = f.id Limit 1) AS f_metodo_pago_codigo,
            p.globalUuid AS p_global_uuid,
            (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS u_fullname_cashier,
            (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno)) AS us_fullname_cancelation,
            (CONCAT(pu.nombre, ' ', pu.ap_paterno, ' ', pu.ap_materno)) AS p_fullname_cashier,
            (CONCAT(puc.nombre, ' ', puc.ap_paterno, ' ', puc.ap_materno)) AS p_fullname_cancelation,
            u.id AS cashier_id,
            us.id AS cancelation_id,
            pu.id AS p_cashier_id,
            puc.id AS p_cancelation_id,
            (select p_way from vw_aca_way_payments where p_id = p.id Limit 1) AS p_metodo_pago_codigo,
			(select p_way_name from vw_aca_way_payments where p_id = p.id Limit 1) AS p_metodo_pago,
			(SELECT GROUP_CONCAT(CONCAT(chargeDetailId, ';', typeExtraCharge, ';', quantity, ';', applicationType))
				FROM ac_charges_details_extra_charges
				where chargeDetailId IN
				(SELECT id FROM ac_cobro_detalle where id_ac_cobro = v.id)
			) AS extras,
			(SELECT SUM(CAST((tempa.quantity - tempa.change) AS DECIMAL(12, 6)))
			from ac_charge_payments tempa
			where academyChargeId = v.id
			  and id not in (p.id)
			  and paymentStatusId in (2,3)
			) AS p_total_without_current,
		   (SELECT GROUP_CONCAT(CONCAT(id,';',cantidad,';',precio)) 
           FROM ac_cobro_detalle where id_ac_cobro = v.id) AS details,
		   (SELECT SUM(CAST((cantidad * precio) AS DECIMAL(12, 6)))
			FROM ac_cobro_detalle
			where id_ac_cobro = v.id
            ) AS total_details_without_extra

        FROM ac_charge_payments p

        LEFT JOIN ac_cobros v ON v.id = p.academyChargeId
        LEFT JOIN alumnos a ON a.id = v.id_alumno
        LEFT JOIN ac_facturas f ON p.id = f.academyChargePaymentId
        LEFT JOIN usuarios u ON u.id = v.id_agente
        LEFT JOIN usuarios us ON us.id = v.id_agente_cancelacion
        LEFT JOIN usuarios pu ON pu.id = p.cashierChargeId
        LEFT JOIN usuarios puc ON puc.id = p.cashierChargeCancellationId
                           where p.createdAt BETWEEN '${startDate}' AND '${endDate}'
                             AND v.id_estado_pago = 2`;

        if (status) {
            queryString = `${queryString} AND p.paymentStatusId = ${status}`;
        }
        if (cycleId) {
            queryString = `${queryString} AND v.ciclo = ${cycleId}`;
        }
        if (branchOfficeId) {
            queryString = `${queryString} AND p.academyPaymentOfficeId = ${branchOfficeId}`;
        }
        if (codigoPago) {
            queryString = `${queryString} AND (select p_way from vw_aca_way_payments where p_id = p.id Limit 1) = ${codigoPago}`;
        }
        if (usersIds && usersIds.length > 0) {
            const user = usersIds.map((u) => {
                return parseInt(`${u}`)
            })
            if (status && status == 4) {
                queryString = `${queryString} AND us.id in (${user.join(',')})`;
            } else {
                queryString = `${queryString} AND u.id in (${user.join(',')})`;
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

    public async reportAcademiaPaymentInvoice({
                                                  status,
                                                  startDate,
                                                  endDate,
                                                  cycleId,
                                                  branchOfficeId,
                                                  codigoPago,
                                              }: IQueryReportAcademiaPayment): Promise<VWPaymentExtraCharge[]> {
        let queryString = `SELECT *
                           FROM vw_aca_payments
                           where f_created_at BETWEEN '${startDate}' AND '${endDate}'
                             AND p_income > 0
                             AND v_status = 2`;

        if (status) {
            queryString = `${queryString} AND f_status = '${status}'`;
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

    public async detailsInvoiceByUuid(params: {
        uuid: string
    }) {
        const result = this.repo
            .createQueryBuilder('payment')
            .leftJoinAndSelect('payment.academyCharge', 'academyCharge')
            .leftJoinAndSelect('academyCharge.chargesDetails', 'chargesDetails')
            .leftJoinAndSelect('chargesDetails.extraCharges', 'extraCharges')
            .select([
                'payment.id',
                'payment.folio',
                'payment.globalUuid',
                'academyCharge.id',
                'academyCharge.folio',
                'chargesDetails',
                'extraCharges'
            ])
            .where('payment.globalUuid = :UUID', {
                UUID: params.uuid,
            });
        return await result.getMany();
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

    public async createReceipt(result: any, branchOfficeSett: any, invoiceFind: any, invoiceDetails: any) {
        const logo = readFileSync(`${this.configService.getPath()}logos/academiaslogo.png`);

        const Receip = new Recibo();

        Receip.setType(InvoiceModules.ACADEMY);

        Receip.addLabel();

        Receip.addLogo({
            width: 100,
            height: 100,
            image: `data:image/png;base64, ${logo.toString('base64')}`,
        });

        Receip.addFolio(result.payment.folio);

        Receip.addDate(moment(result.payment.createdAt).format('YYYY-MM-DD'));

        const regimen = RegimenFiscalList.find(
            (f) => f.value === branchOfficeSett.regime,
        );

        if (regimen !== undefined) {
            Receip.addEmisor({
                name: branchOfficeSett.businessName,
                rfc: branchOfficeSett.rfc,
                regimen:
                    branchOfficeSett.regime + ' - ' + regimen !== undefined ? regimen!.descripcion.toUpperCase() : '',
                expedido: branchOfficeSett.address,
            });
        }

        let name = '';

        if (result.payment.stamping == 0 || invoiceFind == undefined) {
            name = `${result.charge.schoolStudent.name} ${result.charge.schoolStudent.lastNameFather} ${result.charge.schoolStudent.lastNameMother} `;
        } else {
            name = invoiceFind.businessName
        }

        Receip.addReceptor({
            name,
            curp: result.payment.stamping == 0 || invoiceFind == undefined ? 'XAXX010101000' : invoiceFind.rfc,
            matricula: result.charge.schoolStudent.matricula,
            type: InvoiceModules.ACADEMY
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

        return Receip;
    }
}
