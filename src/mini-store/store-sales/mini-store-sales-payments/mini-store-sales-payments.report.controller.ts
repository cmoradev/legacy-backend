import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { convertPaymentsComissionReport, convertPaymentsReport } from './reports/payments.util';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { QuerySimpleReport } from './interface/InvoiceMiniStore.interface';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { Response } from 'express';
import { UsersService } from '../../../system/users/users.service';
import { GenerateMatrizByPayment } from './utils/generate-matriz-by-payment';
import { Public } from '../../../common/docorators/public.decorator';
import {IQueryReportStorePayment} from './types/IReports';
import {StorePaymentExcel} from './reports/store-payment.excel';
import {getNameReport} from '../mini-store-sales/reports/helpers';
import {StorePaymentInvoiceExcel} from './reports/store-payment-invoice.excel';

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
    ){
        const result = await this.service.reportStorePayment(options);

        if (options?.isExported) {
            const conceptStatusExcel = new StorePaymentExcel(options, result);
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
            return res.send({ report, result });
        } else {
            return res.send({report: false, result});
        }
    }

    @Public()
    @Get('/report-store-payment-invoice')
    private async reportStorePaymentInvoice(
        @Res() res: Response,
        @Query() options: IQueryReportStorePayment,
    ){
        const result = await this.service.reportStorePaymentInvoice(options);

        if (options?.isExported) {
            const conceptStatusExcel = new StorePaymentInvoiceExcel(options, result);
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
            return res.send({ report, result });
        } else {
            return res.send({report: false, result});
        }
    }
}
