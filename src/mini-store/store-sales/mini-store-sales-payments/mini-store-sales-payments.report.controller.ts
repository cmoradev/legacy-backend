import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { convertPaymentsComissionReport } from './reports/payments.util';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { QuerySimpleReport } from './interface/InvoiceMiniStore.interface';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { Response } from 'express';
import { UsersService } from '../../../system/users/users.service';
import { Public } from '../../../common/docorators/public.decorator';
import { IQueryReportStorePayment } from './types/IReports';
import { StorePaymentExcel } from './reports/store-payment.excel';
import { getNameReport } from '../mini-store-sales/reports/helpers';
import { StorePaymentInvoiceExcel } from './reports/store-payment-invoice.excel';
import { getDataMatrizPayments, getMatrizPayments } from '../../../school-colegio-ingles/charges-school/school-charges-payments/reports/payments.util';
import { InvoiceModules } from '../../../common/point-of-sale/types.pos';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
// eliminar al cambiar los reporte del front
import { GenerateMatrizByPayment } from './utils/generate-matriz-by-payment';
import { convertPaymentsReport } from './reports/payments.util';

@Controller('report')
export class MiniStoreSalesPaymentsReportController {
    constructor(
        readonly service: MiniStoreSalesPaymentsService,
        readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
        readonly branchOffice: BranchOfficeService,
        readonly branchOfficeSettingService: BranchOfficeSettingService,
        readonly user: UsersService,
    ) {
    }

    @Get('/commissions')
    async commissions(@Req() request, @Res() response: Response, @Query() query: QuerySimpleReport) {
        const payments = await this.service.fetchFilteredPayments(query);
        const sales = await this.service.fetchFilteredSales(query);
        const setting = await this.branchOffice.findBranchWithSettings(query.branchOfficeId);
        // TODO: mejorar esta consulta para traer el primer modulo activo de tienda de las configuraciones
        // * const quantityCommissions = setting.branchoffice[0].perCommissions;
        const quantityCommissions = 10;
        const result = {
            payments: {
                matriz: [],
                payments: [],
            },
            sales: [],
            file: '',
        };
        if (query.onlyFile) {
            result.file = await this.service.reportCommission(quantityCommissions, payments, sales, { base64: true });
        } else {
            const cashiers = await this.service.getUserCasher();
            const paymenMethods = await this.invoiceMethodsPaymentsService.repo.find({
                where: {
                    showReport: true,
                    isActive: true,
                },
            });
            result.payments = convertPaymentsComissionReport(quantityCommissions, payments, cashiers, paymenMethods);
        }
        response.send(result);
    }

    @Public()
    @Get('/report-store-payment')
    private async reportStorePayment(
        @Res() res: Response,
        @Query() options: IQueryReportStorePayment,
    ) {
        const result = await this.service.reportStorePayment(options);
        const dataMatriz = getDataMatrizPayments(result, InvoiceModules.STORE, false);
        const matriz = getMatrizPayments(dataMatriz.payments as MiniStoreSalePayment[], dataMatriz.cashiers, dataMatriz.methodsPayments, InvoiceModules.STORE);
        const obj = {
            data: result,
            dataConverter: dataMatriz,
            matriz: matriz
        };

        if (options?.isExported) {
            const conceptStatusExcel = new StorePaymentExcel(options, result, {
                data: {...dataMatriz, payments: dataMatriz.payments as MiniStoreSalePayment[] },
                matriz
            });
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `${getNameReport('Ingresos', options).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `${getNameReport('Ingresos', options).excel}`,
            };
            return res.send({ report, data: obj });
        } else {
            return res.send({ report: false, data: obj });
        }
    }

    @Public()
    @Get('/report-store-payment-invoice')
    private async reportStorePaymentInvoice(
        @Res() res: Response,
        @Query() options: IQueryReportStorePayment,
    ) {
        const result = await this.service.reportStorePaymentInvoice(options);
        const dataMatriz = getDataMatrizPayments(result, InvoiceModules.STORE, false);
        const matriz = getMatrizPayments(dataMatriz.payments as MiniStoreSalePayment[], dataMatriz.cashiers, dataMatriz.methodsPayments, InvoiceModules.STORE);
        const obj = {
            data: result,
            dataConverter: dataMatriz,
            matriz: matriz
        };

        if (options?.isExported) {
            const conceptStatusExcel = new StorePaymentInvoiceExcel(options, result, {
                data: {...dataMatriz, payments: dataMatriz.payments as MiniStoreSalePayment[] },
                matriz
            });
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `${getNameReport('Ingresos_facturados', options).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `${getNameReport('Ingresos_facturados', options).excel}`,
            };
            return res.send({ report, data: obj });
        } else {
            return res.send({ report: false, data: obj });
        }
    }

    // eliminar al cambiar los reporte del front
    @Public()
    @Get('/simple-report')
    async simpleReport(@Req() req, @Res() res: Response, @Query() query: QuerySimpleReport) {
        try {
            const payments = await this.service.fetchFilteredPayments(query);
            const sales = await this.service.fetchFilteredSales(query);
            const salesReturns = await this.service.fetchFilteredReturns(query);
            const cashiers = await this.user.get_user_with_store_sales();
            const paymentMethods = await this.invoiceMethodsPaymentsService.get_payment_methods_active();
            const matriz = GenerateMatrizByPayment(payments, paymentMethods, cashiers);
            const result = {
                payments: {
                    matriz,
                    payments: [],
                },
                sales: [],
                returns: [],
            };
            if (query.onlyFile) {
                const workbook = await this.service.downloadReport(
                    payments,
                    sales,
                    salesReturns,
                    cashiers,
                    paymentMethods,
                    matriz);
                res.status(200);
                res.setHeader('Content-Type', 'text/xlsx');
                res.setHeader('Content-Disposition', `attachment; filename=Ingresos-${query.startDate} A ${query.endDate}.xlsx`);
                workbook.xlsx.write(res).then(() => {
                    res.end();
                }).catch((error) => Promise.reject(error));
            } else {
                result.payments = convertPaymentsReport(payments, cashiers, paymentMethods);
                res.send(result);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}
