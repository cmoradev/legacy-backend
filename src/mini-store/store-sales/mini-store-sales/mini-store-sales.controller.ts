import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { MiniStoreSalesService } from './mini-store-sales.service';

@Crud({
    model: {
        type: MiniStoreSale,
    },
    query: {
        join: {
            student: {},
            miniStoreSalePayments: {},
            'miniStoreSalePayments.systemPaymentStatus': {},
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

}
