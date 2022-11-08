import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, In } from 'typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
//import { SalesReturns } from '../mini-store-sales-returns/entities/sales-returns.entity';
import { User } from '../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';
import { QueryBilling, QuerySimpleReport } from './interface/InvoiceMiniStore.interface';
import * as nodemailer from 'nodemailer';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import Mail from 'nodemailer/lib/mailer';
import { MiniStoreSaleMethodPayment } from '../mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import { CommissionsReport } from './reports/commissions.report';
import { CellRow } from './utils/generate-matriz-by-payment';
import { ConfigService } from '../../../common/config/config.service';
import moment = require('moment');
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { NotInvoiced } from '../../../common/interface/not-invoiced.interface';
import { MiniStoreInvoice } from '../mini-store-invoices/entities/mini-store-invoice.entity';
import { InvoiceGlobalEnum } from '../../../common/enums/InvoiceGlobal.enum';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { InvoiceStatus } from '../../../invoice/types/invoice-status';
import { FormaPago } from '@signati/core/lib/signati/types/Catalogs/FormaPago';
import { readFileSync, writeFileSync } from 'fs';
import { PDF, XmlToJson } from '@signati/pdf';
import { XmlComprobante } from '@signati/core';
import { A117 } from '../../../pdf/A117/desing/A117';
import { sumQuantity } from '../../../common/point-of-sale/point-of-sale';
import { Decimal } from '@munyaal/calculations';
import { MiniStoreSaleDetail } from '../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { IQueryReportStorePayment } from './types/IReports';
// eliminar al cambiar los reporte del front
import { SalesReturns } from '../mini-store-sales-returns/entities/sales-returns.entity';
import { SimpleReport } from './reports/simple.report';

@Injectable()
export class MiniStoreSalesPaymentsService extends TypeOrmCrudService<MiniStoreSalePayment> {
    constructor(
        @InjectRepository(MiniStoreSalePayment, ColegioDBNameConnection) readonly repo: Repository<MiniStoreSalePayment>,
        @InjectRepository(User, ColegioDBNameConnection) readonly userRepository: Repository<User>,
        @InjectRepository(MiniStoreSale, ColegioDBNameConnection) readonly salesRepository: Repository<MiniStoreSale>,
        @InjectRepository(InvoiceMethodPayment, ColegioDBNameConnection) readonly invoiceMethodPaymentRepository: Repository<InvoiceMethodPayment>,
        @InjectRepository(MiniStoreInvoice, ColegioDBNameConnection) readonly invoiceRepository: Repository<MiniStoreInvoice>,
        @InjectConnection(ColegioDBNameConnection) private connection: Connection,
        private readonly configService: ConfigService,
        // eliminar al cambiar los reporte del front
        @InjectRepository(SalesReturns, ColegioDBNameConnection) readonly salesReturnsRepository: Repository<SalesReturns>,
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

    async countTotalPayments(dateStart: string, dateEnd: string, id: number) {
        return await this.repo.createQueryBuilder('payments')
            .select('SUM(payments.quantity)', 'sum')
            .where('payments.cashierBillingId = :id', { id })
            .andWhere(`DATE(payments.createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'`)
            .getRawOne();

    }

    async fetchFilteredPayments(query: QuerySimpleReport): Promise<MiniStoreSalePayment[]> {
        const paymentsQueryBuilder = this.repo.createQueryBuilder('payment');
        paymentsQueryBuilder.leftJoinAndSelect('payment.storePaymentOffice', 'storePaymentOffice');
        paymentsQueryBuilder.leftJoinAndSelect('payment.agent', 'agent');
        paymentsQueryBuilder.leftJoinAndSelect('payment.miniStoreSale', 'sale');
        paymentsQueryBuilder.leftJoinAndSelect('sale.student', 'student');
        paymentsQueryBuilder.leftJoinAndSelect('payment.miniStoreSaleMethodPayments', 'paymentMethod');
        paymentsQueryBuilder.leftJoinAndSelect('paymentMethod.invoiceMethod', 'invoiceMethod');
        if (query) {

            paymentsQueryBuilder.where('storePaymentOffice.id= :officeId', {
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
                paymentsQueryBuilder.andWhere('agent.id = :agentID', { agentID: query.cashier });
            }
        }
        return await paymentsQueryBuilder.getMany();
    }

    async fetchFilteredSales(query: QuerySimpleReport): Promise<MiniStoreSale[]> {
        const salesQueryBuilder = this.salesRepository.createQueryBuilder('sale').withDeleted();
        salesQueryBuilder.leftJoinAndSelect('sale.storeBranchOffice', 'storeBranchOffice');
        salesQueryBuilder.leftJoinAndSelect('sale.cashier', 'agent');
        salesQueryBuilder.leftJoinAndSelect('sale.student', 'student');
        salesQueryBuilder.leftJoinAndSelect('sale.miniStoreSalePayments', 'payments');
        salesQueryBuilder.leftJoinAndSelect('sale.miniStoreSaleDetails', 'details');
        salesQueryBuilder.leftJoinAndSelect('details.miniStoreProduct', 'products');
        if (query) {
            salesQueryBuilder.where('storeBranchOffice.id= :officeId', {
                officeId: query.branchOfficeId,
            });
            salesQueryBuilder.andWhere('payments.paymentStatus= :paymentStatus', {
                paymentStatus: query.status,
            });
            if (query.invoiceStatus) {
                salesQueryBuilder.andWhere('payments.stamping= :invoiceStatus', {
                    invoiceStatus: query.invoiceStatus,
                },
                );
            }
            salesQueryBuilder.andWhere('payments.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.cashier) {
                salesQueryBuilder.andWhere('agent.id = :agentID', { agentID: query.cashier });
            }
        }

        salesQueryBuilder.andWhere('sale.deletedAt IS NULL')

        return await salesQueryBuilder.getMany();
    }

    public async getUserCasher(): Promise<User[]> {
        const cashiersAndSales = await this.userRepository.find({
            relations: ['salePayments', 'department'],
            select: ['id', 'name'],
        });
        return cashiersAndSales.filter(cashier => {
            if (cashier.department !== null && cashier.department.id === 2 || cashier.salePayments.length > 0) {
                return cashier;
            }
        });
    }

    async reportCommission(
        quantityCommissions: number,
        payments: MiniStoreSalePayment[],
        sales: MiniStoreSale[],
        options?: { base64: boolean }): Promise<string | any> {

        const cashiersAndSales = await this.userRepository.find({
            relations: ['salePayments', 'department', 'role'],
        });

        const paymentMethods = await this.invoiceMethodPaymentRepository.find({
            where: {
                showReport: true,
                isActive: true,
            },
        });

        const cashiers = cashiersAndSales.filter(cashier => {
            if (cashier.role.id === 5 && cashier.department.id === 2 || cashier.salePayments.length > 0) {
                return cashier;
            }
        });
        const report = new CommissionsReport();
        const workbook = report.generate({
            quantityCommissions,
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
                return await workbook.xlsx.writeFile('./xls-imports/' + fileName);
            }
        } catch (e) {
            return e;
        }
    }

    async findSaleByPayment(query: QueryBilling): Promise<{ sale: MiniStoreSale, payment: MiniStoreSalePayment, highestPayment: MiniStoreSaleMethodPayment }> {
        let sale = {} as MiniStoreSale;
        if (query.saleId != 0) {
            sale = await this.salesRepository.findOne({
                where: {
                    id: query.saleId,
                },
                relations: [
                    'miniStoreSaleDetails',
                    'miniStoreSaleDetails.miniStoreProduct',
                    'miniStoreSaleDetails.extraCharges',
                    'student',
                    'cashier'
                ],
            });
        }
        let payment = {} as MiniStoreSalePayment;
        if (query.salePaymentId != 0) {
            payment = await this.repo.findOne({
                where: {
                    id: query.salePaymentId,
                },
                relations: [
                    'miniStoreSaleMethodPayments',
                    'miniStoreSaleMethodPayments.invoiceMethod',
                    'agent'
                ],
            });
        } else {
            let quantitySum = 0;
            sale.miniStoreSaleDetails.forEach((d: MiniStoreSaleDetail) => {
                const price = d.priceWithIVA
                quantitySum = Decimal.add(quantitySum, Decimal.mul(price, d.quantity)).toNumber();
            });
            payment.quantity = quantitySum;
            payment.change = 0;
            payment.folio = sale.folio ? sale.folio : 'N/A';
            payment.createdAt = sale.createdAt ? sale.createdAt : new Date();
            payment.stamping = 0;
            payment.agent = {
                name: sale.cashier ? sale.cashier.name : '',
                lastnameFather: sale.cashier ? sale.cashier.lastnameFather : '',
                lastnameMother: sale.cashier ? sale.cashier.lastnameMother : ''
            } as User;
            payment.observations = sale.observations ? sale.observations : '';
            payment.miniStoreSaleMethodPayments = [];
        }

        return {
            sale,
            payment,
            highestPayment: this.getHighestPayment(payment.miniStoreSaleMethodPayments),
        };
    }

    getHighestPayment(formadepago: MiniStoreSaleMethodPayment[]) {
        if (formadepago.length >= 1) {
            const methodpaymenst = formadepago.sort((a, b) => {
                return a.quantity - b.quantity;
            });
            return methodpaymenst[0];
        } else {
            return {} as MiniStoreSaleMethodPayment;
        }
    }

    async updatePayment(data: MiniStoreSalePayment) {
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

    public async saveXmlAndPdf(uuid: string, xml: string, address: string): Promise<XmlComprobante> {
        try {
            const logo = readFileSync(`${this.configService.getPath()}logos/tienditalogo.png`);

            const path = `${this.configService.getPath()}comprobantes/tienda/${uuid}.xml`;

            writeFileSync(path, xml);

            const cfdi = await XmlToJson(path);

            const desingpdf = new A117(path, {
                lugarExpedicion: address,
                logo: `data:image/png;base64, ${logo.toString('base64')}`,
            });

            const pdf = new PDF<A117>(desingpdf);

            await pdf.save(`${this.configService.getPath()}comprobantes/tienda/${uuid}`);

            return cfdi['cfdi:Comprobante'] as XmlComprobante;
        } catch (e) {
            throw new NotFoundException('Could not save xml or pdf');
        }
    }

    public async updateStampingPayments(ids: number[], uuid: string): Promise<any> {
        try {
            return this.connection.query(`
                UPDATE tie_venta_pagos p
                SET timbrado   = 1,
                    globalUuid = '${uuid}'
                WHERE p.id IN (${ids.join(',')});
            `);
        } catch (e) {
            throw new NotFoundException('Error updating payments to invoiced');
        }
    }

    public async getGlobalInvoiceFromSales(query: NotInvoicedDto): Promise<any> {
        const billedPayments: NotInvoiced[] = [];
        const unbilledPayments: NotInvoiced[] = [];
        let totalUnbilledPayments = 0;
        let totalBilledPayments = 0;
        let invoice: MiniStoreInvoice[] | null = null;

        const data: NotInvoiced[] = await this.connection.query(`
            SELECT *
            FROM vw_tie_payments vw
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
        const data: NotInvoiced[] = await this.connection.query(`
            SELECT *
            FROM vw_tie_payments vw
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
            FROM vw_tie_way_payments vw
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

    public async getGlobalInvoice(branchOffice: BranchOffice, branchOfficeConfig: BranchOfficeSetting): Promise<MiniStoreInvoice> {
        const finded = await this.invoiceRepository.findOne({
            where: {
                isGlobal: `${InvoiceGlobalEnum.IS_GLOBAL}`,
                status: `${InvoiceStatus.Unbilled}`,
                invoiceBranchOffice: { id: branchOffice.id },
                invoiceBranchOfficeSet: { id: branchOfficeConfig.id },
            }
        });

        if (finded?.id) {
            return finded;
        } else {
            const payload = new MiniStoreInvoice();
            payload.folio = '';
            payload.uuid = '';
            payload.businessName = 'PUBLICO EN GENERAL';
            payload.rfc = 'XAXX010101000';
            payload.status = InvoiceStatus.Unbilled;
            payload.isGlobal = InvoiceGlobalEnum.IS_GLOBAL;
            payload.invoiceBranchOffice = { id: branchOffice.id } as BranchOffice;
            payload.invoiceBranchOfficeSet = { id: branchOfficeConfig.id } as BranchOfficeSetting;
            const invoice = await this.invoiceRepository.save(payload);

            return this.invoiceRepository.findOne({
                where: { id: invoice.id }
            })
        }
    }

    public async reportStorePayment({
        status,
        startDate,
        endDate,
        cycleId,
        branchOfficeId,
        codigoPago,
        usersIds,
    }: IQueryReportStorePayment): Promise<NotInvoiced[]> {
        let queryString = `SELECT * FROM vw_tie_payments where p_created_at BETWEEN '${startDate}' AND '${endDate}' AND v_status = 2`;

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
            const user = usersIds.map((u) => { return parseInt(`${u}`) })
            if (status && status == 4) {
                queryString = `${queryString} AND cancelation_id_venta in (${user.join(',')})`;
            } else { queryString = `${queryString} AND cashier_id_venta in (${user.join(',')})`; }
        }
        try {
            return this.connection.query(queryString);
        } catch (e) {
            throw new NotFoundException(
                `Error in query or conection [${queryString}]`,
            );
        }
    }

    public async reportStorePaymentInvoice({
        status,
        startDate,
        endDate,
        cycleId,
        branchOfficeId,
        codigoPago,
    }: IQueryReportStorePayment): Promise<NotInvoiced[]> {
        let queryString = `SELECT * FROM vw_tie_payments where f_created_at BETWEEN '${startDate}' AND '${endDate}' AND f_folio is not null`;

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

    // eliminar al cambiar los reporte del front
    async fetchFilteredReturns(query: QuerySimpleReport) {
        const salesReturnsQB = this.salesReturnsRepository.createQueryBuilder('saleReturn');
        salesReturnsQB.leftJoinAndSelect('saleReturn.agent', 'agent');
        salesReturnsQB.leftJoinAndSelect('saleReturn.sale', 'sale');
        salesReturnsQB.leftJoinAndSelect('sale.storeBranchOffice', 'storeBranchOffice');
        salesReturnsQB.leftJoinAndSelect('saleReturn.details', 'details');
        salesReturnsQB.leftJoinAndSelect('details.saleDetail', 'saleDetail');
        salesReturnsQB.leftJoinAndSelect('saleDetail.miniStoreProduct', 'product');
        salesReturnsQB.leftJoinAndSelect('sale.student', 'student');
        salesReturnsQB.leftJoinAndSelect('saleReturn.paymentMethod', 'paymentMethod');
        if (query) {

            salesReturnsQB.where('storeBranchOffice.id= :officeId', {
                officeId: query.branchOfficeId,
            });

            salesReturnsQB.andWhere('saleReturn.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.cashier) {
                salesReturnsQB.andWhere('agent.id = :agentID', { agentID: query.cashier });
            }
        }

        return salesReturnsQB.getMany();
    }

    async downloadReport(payments: MiniStoreSalePayment[],
        sales: MiniStoreSale[],
        salesReturns: SalesReturns[],
        cashiers: User[],
        paymentMethods: InvoiceMethodPayment[],
        matriz: CellRow[][]) {
        return new SimpleReport().generate({
            payments,
            cashiers,
            paymentMethods,
            salesReturns,
            sales,
        }, matriz);
    }

    async simpleReport(payments: MiniStoreSalePayment[],
        sales: MiniStoreSale[],
        salesReturns: SalesReturns[],
        cashiers: User[],
        paymentMethods: InvoiceMethodPayment[],
        matriz: CellRow[][],
        options?: { base64: boolean }): Promise<string | any> {


        const workbook = new SimpleReport().generate({
            payments,
            cashiers,
            paymentMethods,
            salesReturns,
            sales,
        }, matriz);
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
}
