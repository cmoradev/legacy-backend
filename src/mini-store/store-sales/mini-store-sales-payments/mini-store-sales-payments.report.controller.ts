import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { convertPaymentsComissionReport, convertPaymentsReport } from './reports/payments.util';
import {
    InvoiceMethodsPaymentsService
} from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { QuerySimpleReport } from './interface/InvoiceMiniStore.interface';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { Response } from 'express';
import { UsersService } from '../../../system/users/users.service';
import { Public } from '../../../common/docorators/public.decorator';
import { IQueryReportStorePayment } from './types/IReports';
import { getRangeDates } from '../mini-store-sales/reports/helpers';
import { InvoiceModules } from '../../../common/point-of-sale/types.pos';
import { NotInvoiced } from '../../../common/interface/not-invoiced.interface';
import * as AdmZip from 'adm-zip';
import { ConfigService } from '../../../common/config/config.service';
import { getDataFullMatrizAndData, PaymentExcel, reportPaymentByClient } from '../../../common/utils/report/index';
// eliminar al cambiar los reporte del front
import { GenerateMatrizByPayment } from './utils/generate-matriz-by-payment';

@Controller('report')
export class MiniStoreSalesPaymentsReportController {
    constructor(
        readonly service: MiniStoreSalesPaymentsService,
        readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
        readonly branchOffice: BranchOfficeService,
        readonly branchOfficeSettingService: BranchOfficeSettingService,
        readonly user: UsersService,
        private readonly configService: ConfigService,
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
            result.file = await this.service.reportCommission(quantityCommissions, payments, sales, {base64: true});
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

        const obj = getDataFullMatrizAndData(result, InvoiceModules.STORE, false, options.status != null ? parseInt(`${options.status}`) : 0);

        let dataByClient = [];

        if (options.byClient) {
            dataByClient = reportPaymentByClient(obj.data);
        }

        if (options?.isExported) {
            const conceptStatusExcel = new PaymentExcel(options, options.byClient ? dataByClient : obj.data, obj.matriz, InvoiceModules.STORE, 'Pagos')
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `Tie_Pagos_${getRangeDates(options.startDate, options.endDate).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `Tie_Pagos_${getRangeDates(options.startDate, options.endDate).excel}}`,
            };
            return res.send({report, data: options.byClient ? dataByClient : obj.data, obj});
        } else {
            return res.send({report: false, data: options.byClient ? dataByClient : obj.data, obj});
        }
    }

    @Public()
    @Get('/report-store-payment-invoice')
    private async reportStorePaymentInvoice(
        @Res() res: Response,
        @Query() options: IQueryReportStorePayment,
    ) {
        const obj = getDataFullMatrizAndData(
            await this.service.reportStorePaymentInvoice(options),
            InvoiceModules.STORE,
            true,
            options.status != null ? parseInt(`${options.status}`) : 0);

        let dataByClient = [];

        if (options.byClient) {
            dataByClient = reportPaymentByClient(obj.data);
        }

        if (options?.isExported) {
            const conceptStatusExcel = new PaymentExcel(options, options.byClient ? dataByClient : obj.data, obj.matriz, InvoiceModules.STORE, 'Pagos Facturados')
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `Tie_Pagos_Facturados${getRangeDates(options.startDate, options.endDate).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `Tie_Pagos_Facturados${getRangeDates(options.startDate, options.endDate).excel}`,
            };
            return res.send({report, data: options.byClient ? dataByClient : obj.data, obj});
        } else {
            return res.send({report: false, data: options.byClient ? dataByClient : obj.data, obj});
        }
    }

    @Post('zip-invoices')
    async zipInvoices(@Res() res: Response, @Body() params: {
                          array: NotInvoiced[]
                      }
    ) {
        try {
            const zip = new AdmZip();
            params.array.forEach((i: NotInvoiced) => {
                zip.addLocalFile(`${this.configService.getPath()}comprobantes/tienda/${i.f_uuid != null ? i.f_uuid : i.p_global_uuid}.pdf`);
                zip.addLocalFile(`${this.configService.getPath()}comprobantes/tienda/${i.f_uuid != null ? i.f_uuid : i.p_global_uuid}.xml`);
            });

            const downloadName = `${Date.now()}.zip`;
            const data = zip.toBuffer();
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content-Disposition', `attachment; filename=${downloadName}`);
            res.set('Content-Length', data.length.toString());
            res.send(data);
        } catch (e) {
            res.status(500);
            res.send(e.message);
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
