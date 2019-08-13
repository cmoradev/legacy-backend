import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSaleMethodPayment } from './entities/mini-store-sale-method-payment.entity';
import { MiniStoreSalesMethodsPaymentsService } from './mini-store-sales-methods-payments.service';

@Crud({
    model: {
        type: MiniStoreSaleMethodPayment,
    },
    query: {
        join: {
            invoiceMethodPayment: {},
            miniStoreSalePayment: {},
        },
    },
})
@Controller()
export class MiniStoreSalesMethodsPaymentsController implements CrudController<MiniStoreSaleMethodPayment> {
    constructor(
        readonly service: MiniStoreSalesMethodsPaymentsService,
    ) { }
    get base(): CrudController<MiniStoreSaleMethodPayment> {
        return this;
    }
}
