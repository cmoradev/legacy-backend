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

// @UseGuards(JwtGuard)
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

    @Get('/simple-report')
    async simpleReport(@Req() req, @Res() res: Response, @Query() query: QuerySimpleReport) {
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
            file: '',
        };
        if (query.onlyFile) {
            result.file = await this.service.simpleReport(
              payments,
              sales,
              salesReturns,
              cashiers,
              paymentMethods,
              matriz,
              { base64: true });
        } else {

            const viewPayments = convertPaymentsReport(payments, cashiers, paymentMethods);
            result.payments = viewPayments;
        }
        res.send(result);
    }

    @Get('/commissions')
    async commissions(@Req() request, @Res() response: Response, @Query() query: QuerySimpleReport) {
        const payments = await this.service.fetchFilteredPayments(query);
        const sales = await this.service.fetchFilteredSales(query);
        const setting = await this.branchOffice.findBranchWithSettings(query.branchOfficeId);
        // todo mejorar esta consulta para traer el primer modulo activo de tienda de las configuraciones
        // const quantityCommissions = setting.branchoffice[0].perCommissions;
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
            const viewPayments = convertPaymentsComissionReport(quantityCommissions, payments, cashiers, paymenMethods);
            result.payments = viewPayments;
        }
        response.send(result);
    }
}
