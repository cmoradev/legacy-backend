import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { MiniStoreSalesService } from './mini-store-sales.service';
import { totalForCashier, totalForCategory, totalForProducts } from './reports/mini-store-sale.report';
import { MiniStoreSalesPaymentsService } from '../mini-store-sales-payments/mini-store-sales-payments.service';
import { SaleReport } from './types/SaleReport';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStoreSale,
    },
    query: {
        join: {
            cashier: {},
            student: {},
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

    @Override()
    async createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: MiniStoreSale,
    ) {
        const sale = await this.base.createOneBase(req, dto);
        sale.folio += sale.id;
        return sale;
    }

    @Get('/sale-report')
    async saleReport(@Req() request, @Res() res, @Query() query: {
        status: number,
        startDate: Date,
        endDate: Date,
        cashier?: number,
        onlyFile: boolean,
        type: number,
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
            }));
        }
        res.send(result);
    }
}
