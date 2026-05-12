import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { SalesReturns } from '../mini-store-sales-returns/entities/sales-returns.entity';
import { User } from '../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';
import { QueryBilling, QuerySimpleReport } from './interface/InvoiceMiniStore.interface';
import * as nodemailer from 'nodemailer';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import Mail from 'nodemailer/lib/mailer';
import {
    MiniStoreSaleMethodPayment
} from '../mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import { CommissionsReport } from './reports/commissions.report';
import { CellRow } from './utils/generate-matriz-by-payment';
import { ConfigService } from '../../../common/config/config.service';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { NotInvoiced, VWPaymentExtraCharge } from '../../../common/interface/not-invoiced.interface';
import { MiniStoreInvoice } from '../mini-store-invoices/entities/mini-store-invoice.entity';
import { InvoiceGlobalEnum } from '../../../common/enums/InvoiceGlobal.enum';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { InvoiceStatus } from '../../../invoice/types/invoice-status';
import { FormaPago } from '@signati/core/lib/signati/types/Catalogs/FormaPago';
import { readFileSync, writeFileSync } from 'fs';
import { PDF, XmlToJson } from '@signati/pdf';
import { RegimenFiscalList, XmlComprobante } from '@signati/core';
import { A117 } from '../../../pdf/A117/desing/A117';
import { roundQuantity, sumQuantity } from '../../../common/point-of-sale/point-of-sale';
import { Decimal } from '@munyaal/calculations';
import { MiniStoreSaleDetail } from '../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { IQueryReportStorePayment } from './types/IReports';
import { SimpleReport } from './reports/simple.report';
import { Recibo } from "../../../common/pdfmake/Recibo";
import { InvoiceModules } from "../../../common/point-of-sale/types.pos";
import { PaymentStatus } from "../../../common/enums/PaymentStatus";
import { AttachmentsType } from "../../../types";
import { ReceiptTemplate } from "../../../templates/receipt";
import { CancellationDto } from '../../../common/dto/Cancellation.dto';
import { AuthService } from '../../../system/auth/auth.service';
import moment = require('moment');

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
        @InjectRepository(SalesReturns, ColegioDBNameConnection) readonly salesReturnsRepository: Repository<SalesReturns>,
        private readonly authService: AuthService
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

    async countTotalPayments(dateStart: string, dateEnd: string, id: number) {
        return await this.repo.createQueryBuilder('payments')
            .select('SUM(payments.quantity)', 'sum')
            .where('payments.cashierBillingId = :id', {id})
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
                paymentsQueryBuilder.andWhere('payment.stamping = :invoiceStatus', {invoiceStatus: query.invoiceStatus});
            }
            if (query.cashier) {
                paymentsQueryBuilder.andWhere('agent.id = :agentID', {agentID: query.cashier});
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
                salesQueryBuilder.andWhere('agent.id = :agentID', {agentID: query.cashier});
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

    public async reportCommission(
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

    async findSaleByPayment(query: QueryBilling): Promise<{
        sale: MiniStoreSale,
        payment: MiniStoreSalePayment,
        highestPayment: MiniStoreSaleMethodPayment
    }> {
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
                let price = d.priceWithIVA
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
        let payment = await this.repo.findOne({id: data.id});
        payment = {...data};
        return await this.repo.save(payment);
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
            FROM vw_my_tie_payments vw
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
            FROM vw_my_tie_payments vw
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
                invoiceBranchOffice: {id: branchOffice.id},
                invoiceBranchOfficeSet: {id: branchOfficeConfig.id},
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
            payload.invoiceBranchOffice = {id: branchOffice.id} as BranchOffice;
            payload.invoiceBranchOfficeSet = {id: branchOfficeConfig.id} as BranchOfficeSetting;
            const invoice = await this.invoiceRepository.save(payload);

            return this.invoiceRepository.findOne({
                where: {id: invoice.id}
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
                                    }: IQueryReportStorePayment): Promise<VWPaymentExtraCharge[]> {
        let queryString = `SELECT *
                           FROM vw_tie_payments
                           where p_created_at BETWEEN '${startDate}' AND '${endDate}'
                             AND p_income > 0
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
                queryString = `${queryString} AND p_cashier_id in (${user.join(',')})`;
            } else {
                queryString = `${queryString} AND p_cancelation_id in (${user.join(',')})`;
            }
        }
        try {
            console.log(queryString)
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
                                           }: IQueryReportStorePayment): Promise<VWPaymentExtraCharge[]> {
        let queryString = `SELECT *
                           FROM vw_tie_payments
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
                salesReturnsQB.andWhere('agent.id = :agentID', {agentID: query.cashier});
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

    public async detailsInvoiceByUuid(params: {
        uuid: string
    }) {
        const result = this.repo
            .createQueryBuilder('sales-payments')
            .leftJoinAndSelect('sales-payments.miniStoreSale', 'miniStoreSale')
            .leftJoinAndSelect('miniStoreSale.miniStoreSaleDetails', 'miniStoreSaleDetails')
            .leftJoinAndSelect('miniStoreSaleDetails.extraCharges', 'extraCharges')
            .select([
                'sales-payments.id',
                'sales-payments.folio',
                'sales-payments.globalUuid',
                'miniStoreSale.id',
                'miniStoreSale.folio',
                'miniStoreSaleDetails',
                'extraCharges'
            ])
            .where('sales-payments.globalUuid = :UUID', {
                UUID: params.uuid,
            });
        return await result.getMany();
    }

    public async createReceipt(result: any, branchOfficeSett: any, invoiceFind: any, invoiceDetails: any) {
        const logo = readFileSync(`${this.configService.getPath()}logos/tienditalogo.png`);

        const Receip = new Recibo();

        Receip.setType(InvoiceModules.STORE);

        if (result.sale.statusSale != PaymentStatus.quotation) {
            Receip.addLabel();
        } else {
            Receip.addLabelQuote();
        }

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
            name = `${result.sale.student.name} ${result.sale.student.lastNameFather} ${result.sale.student.lastNameMother} `;
        } else {
            name = invoiceFind.businessName
        }

        Receip.addReceptor({
            name,
            curp: result.payment.stamping == 0 || invoiceFind == undefined ? 'XAXX010101000' : invoiceFind.rfc,
            matricula: result.sale.student.matricula,
            type: InvoiceModules.STORE
        });

        const ven =
            result.payment.agent.name +
            ' ' +
            result.payment.agent.lastnameFather +
            ' ' +
            result.payment.agent.lastnameMother;

        Receip.addInformacion({
            vendedor: ven,
        });

        Receip.addCatidad({
            ...invoiceDetails.totals.receipt
        });

        Receip.addDetalles(invoiceDetails.concepts.conceptsMiniStore);

        Receip.addNumberToLetter(+invoiceDetails.totals.receipt.Total);

        Receip.addObervations(result.payment.observations);

        const forma = result.payment.miniStoreSaleMethodPayments.map((m) => {
            return {
                forma: m.invoiceMethod.name,
                cantidad: roundQuantity(m.quantity),
                banco: m.Bank ? m.Bank.name : '',
                cuenta: m.account,
                fecha: m.date,
            };
        });

        Receip.addFormaPago(forma);

        return Receip;
    }

    public async cancelPayment(id: number, payload: CancellationDto) {
        try {

            const object = await this.findOne(id);

            if (!object) {
                throw new NotFoundException('Pago tienda no encontrado')
            }

            if (object.paymentStatus === PaymentStatus.Cancelled) {
                throw new BadRequestException('El pago ya está cancelado');
            }

            const { reasonCancellation} = payload;

            const user = await this.authService.validateUserCancellation(payload);

            const result = await this.repo.update({id}, {
                reasonCancellation,
                dateCancellation: new Date(),
                paymentStatus: PaymentStatus.Cancelled,
                agentCanceling: {id: user.id}
            });

            if(result && result.affected && result.affected > 0) {
                return id;
            }else {
                throw new BadRequestException(`Error al cancelar el pago tienda ${id}`);    
            }

        } catch (e) {
            if (e?.status === 401) throw new UnauthorizedException('Credenciales de administrador incorrecta');

            console.error(`Error al cancelar pago tienda ${id}: ${e}`);

            throw new BadRequestException(`Error al cancelar el pago tienda ${id}`);
        }
    }
}
