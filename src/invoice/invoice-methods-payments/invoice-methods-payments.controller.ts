import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InvoiceMethodPayment } from './entities/invoice-method-payment.entity';
import { InvoiceMethodsPaymentsService } from './invoice-methods-payments.service';

@Crud({
    model: {
        type: InvoiceMethodPayment,
    },
    query: {
        join: {
            miniStoreSaleMethodPayments: {},
        },
    },
})
@Controller()
export class InvoiceMethodsPaymentsController implements CrudController<InvoiceMethodPayment> {
    constructor(
        readonly service: InvoiceMethodsPaymentsService,
    ) {}
    get base(): CrudController<InvoiceMethodPayment> {
        return this;
    }
}
