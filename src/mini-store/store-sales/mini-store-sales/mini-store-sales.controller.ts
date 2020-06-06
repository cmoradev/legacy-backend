import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { MiniStoreSalesService } from './mini-store-sales.service';
import { totalForCashier, totalForCategory, totalForProducts } from './reports/mini-store-sale.report';
import { MiniStoreSalesPaymentsService } from '../mini-store-sales-payments/mini-store-sales-payments.service';
import { SaleReport } from './types/SaleReport';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
import { QuerySimpleReport } from '../mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { ManyToOne } from 'typeorm';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStoreSale,
    },
    query: {
        join: {
            cashier: {},
            student: {},
            storeBranchOffice: {},
            storeBranchOfficeSet: {},
            miniStoreSalePayments: {},
            'miniStoreSalePayments.miniStoreInvoices': {},
            'miniStoreSalePayments.agent': {},
            'miniStoreSalePayments.miniStoreSaleMethodPayments': {},
            'miniStoreSalePayments.miniStoreSaleMethodPayments.Bank': {},
            'miniStoreSalePayments.miniStoreSaleMethodPayments.invoiceMethodPayment': {},
            miniStoreSaleDetails: {},
            'miniStoreSaleDetails.miniStoreProduct': {},
            'miniStoreSaleDetails.extraCharges': {},
            miniStoreInvoices: {},
            returnedProducts: {},
            'returnedProducts.agent': {},
            'returnedProducts.invoices': {},
            'returnedProducts.details': {},
            'returnedProducts.details.saleDetail': {},
            agentBilling: {},
            agentCanceling: {},
        },
    },
})
@Controller()
export class MiniStoreSalesController implements CrudController<MiniStoreSale> {
    constructor(
        readonly service: MiniStoreSalesService,
        readonly paymentService: MiniStoreSalesPaymentsService,
    ) {
    }

    get base(): CrudController<MiniStoreSale> {
        return this;
    }

    @Get('/sale-report')
    async saleReport(@Req() request, @Res() res, @Query() query: {
        status: number,
        startDate: Date,
        endDate: Date,
        onlyFile: boolean,
        type: number,
        branchOfficeId: number;
    }) {

        const result: SaleReport = {
            products: [],
            category: [],
            cashier: [],
            file: '',
        };
        if (query.type === 1 || query.type.toString() === '1') {
            result.products = totalForProducts(await this.service.reportCatCasherProd(query));
        }
        if (query.type === 2 || query.type.toString() === '2') {
            result.category = totalForCategory(await this.service.reportCatCasherProd(query));
        }
        if (query.type === 3 || query.type.toString() === '3') {
            result.cashier = totalForCashier(await this.paymentService.fetchFilteredPayments({
                status: query.status,
                endDate: query.endDate,
                startDate: query.startDate,
                branchOfficeId: query.branchOfficeId,
            } as QuerySimpleReport));
        }
        res.send(result);
    }
}
