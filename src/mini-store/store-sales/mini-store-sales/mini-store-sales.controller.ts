import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { MiniStoreSalesService } from './mini-store-sales.service';
import { totalForProducts } from './reports/mini-store-sale.report';

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
    }) {

        // return x
        res.send(totalForProducts(await this.service.reportCatCasherProd(query)));
        // res.send( await this.service.reportCatCasherProd(query));
    }
}
