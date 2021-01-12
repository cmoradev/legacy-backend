import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { convertPaymentsComissionReport, convertPaymentsReport } from './reports/payments.util';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { QueryBilling, QuerySimpleReport } from './interface/InvoiceMiniStore.interface';
import { ConceptsPriceByPaymentBillig } from '../../../common/point-of-sale/miniStore-point-of-sale';
import { FactSw } from '../../../webService/FactSw';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
import { GenerateInvoice } from './utils/generateInvoice';
import { MiniStoreInvoice } from '../mini-store-invoices/entities/mini-store-invoice.entity';
import { MiniStoreInvoicesService } from '../mini-store-invoices/mini-store-invoices.service';
import { User } from '../../../system/users/entities/user.entity';
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { PDF, XmlToJson } from '@signati/pdf';
import * as fs from 'fs';
import { XmlCdfi } from '@signati/core';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { readFileSync } from 'fs';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Controller('report')
export class MiniStoreSalesPaymentsReportController {
    constructor(
      readonly service: MiniStoreSalesPaymentsService,
      readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
      readonly branchOffice: BranchOfficeService,
      readonly branchOfficeSettingService: BranchOfficeSettingService,
    ) {
    }

    @Get('/simple-report')
    async simpleReport(@Req() request, @Res() response: Response, @Query() query: QuerySimpleReport) {
        const payments = await this.service.fetchFilteredPayments(query);
        const sales = await this.service.fetchFilteredSales(query);
        const salesReturns = await this.service.fetchFilteredReturns(query);
        const result = {
            payments: {
                matriz: [],
                payments: [],
            },
            sales: [],
            returns: [],
            file: '',
        };
        if (query.onlyFile) {
            result.file = await this.service.simpleReport(payments, sales, salesReturns, { base64: true });
        } else {
            const cashiers = await this.service.getUserCasher();
            const paymenMethods = await this.invoiceMethodsPaymentsService.repo.find({
                where: {
                    showReport: true,
                    isActive: true,
                },
            });
            const viewPayments = convertPaymentsReport(payments, cashiers, paymenMethods);
            result.payments = viewPayments;
        }
        response.send(result);
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
