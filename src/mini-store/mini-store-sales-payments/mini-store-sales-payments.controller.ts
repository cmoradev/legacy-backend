import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';

@Crud({
    model: {
        type: MiniStoreSalePayment,
    },
    query: {
        join: {
            miniStoreSale: {},
            miniStorePaymentStatus: {},
            miniStoreSaleMethodPayments: {},
            miniStoreInvoices: {},
        },
    },
})
@Controller()
export class MiniStoreSalesPaymentsController implements CrudController<MiniStoreSalePayment> {
    constructor(
        readonly service: MiniStoreSalesPaymentsService,
    ) {
    }

    get base(): CrudController<MiniStoreSalePayment> {
        return this;
    }
}
