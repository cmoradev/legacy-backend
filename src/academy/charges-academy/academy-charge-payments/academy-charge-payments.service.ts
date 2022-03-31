import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Connection, Repository } from 'typeorm';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';
import { QuerySimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { User } from '../../../system/users/entities/user.entity';
import { AcademyCharge } from '../academy-charge/entities/academy-charge.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { SimpleReportAcademy } from './reports/simple.report';
import { QueryBillingAcademy } from './types/InvoiceAcademy.interface';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { AcademyChargeMethodsPayments } from '../academy-charge-methods-payments/entities/academy-charge-methods-payments.entity';
import { ConfigService } from '../../../common/config/config.service';
import moment = require('moment');
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { NotInvoiced } from '../../../common/interface/not-invoiced.interface';
import { FormaPago } from '@signati/core/lib/signati/types/Catalogs/FormaPago';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { MiniStoreInvoice } from '../../../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { InvoiceGlobalEnum } from '../../../common/enums/InvoiceGlobal.enum';
import { InvoiceStatus } from '../../../invoice/types/invoice-status';
import { AcademyChargeInvoice } from '../academy-charge-invoice/entities/academy-charge-invoice.entity';
import { XmlComprobante } from '@signati/core';
import { readFileSync, writeFileSync } from 'fs';
import { PDF, XmlToJson } from '@signati/pdf';
import { A117 } from '../../../pdf/A117/desing/A117';

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
        const object = await this.repo.findOne({ id }, { withDeleted: true });
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
                paymentsQueryBuilder.andWhere('payment.stamping = :invoiceStatus', { invoiceStatus: query.invoiceStatus });
            }
            if (query.cashier) {
                paymentsQueryBuilder.andWhere('cashierCharge.id = :agentID', { agentID: query.cashier });
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
                salesQueryBuilder.andWhere('cashier.id = :agentID', { agentID: query.cashier });
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

    async simpleReport(payments: AcademyChargePayments[], sales: AcademyCharge[], options?: { base64: boolean }): Promise<string | any> {

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
            ],
        });

        const payment = await this.repo.findOne({
            where: {
                id: query.chargePaymentId,
            },
            relations: [
                'methodsPayments',
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
        let payment = await this.repo.findOne({ id: data.id });
        payment = { ...data };
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
            .leftJoinAndSelect('payments.academyPaymentOffice', 'academyPaymentOffice', 'academyPaymentOffice.id=:branchOfficeId', { branchOfficeId })
            .leftJoinAndSelect('payments.academyCharge', 'academyCharge')
            .leftJoinAndSelect('academyCharge.chargeCycle', 'chargeCycle', 'chargeCycle.id=:cycleId', { cycleId: ciclyId })
            .select('SUM(payments.quantity-payments.change)', 'sum')
            .where(`DATE(payments.createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'`)
            .getRawOne();
    }

    public async notInvoiced(query: NotInvoicedDto): Promise<NotInvoiced[]> {
        const data: NotInvoiced[] = await this.connection.query(`
                SELECT *
                FROM vw_aca_payments vw
                WHERE (vw.f_status IS NULL OR vw.f_status = '0')
                  AND vw.p_stamping = '0'
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
                SET timbrado = 1, globalUuid = '${uuid}'
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
}
