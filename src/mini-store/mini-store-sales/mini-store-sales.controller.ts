import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
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
            miniStoreSaleDetails: {},
            'miniStoreSaleDetails.miniStoreProduct': {},
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
}
