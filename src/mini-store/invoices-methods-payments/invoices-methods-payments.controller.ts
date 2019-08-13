import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InvoiceMethodPayment } from './entities/invoice-method-payment.entity';
import { InvoicesMethodsPaymentsService } from './invoices-methods-payments.service';

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
export class InvoicesMethodsPaymentsController implements CrudController<InvoiceMethodPayment> {
    constructor(
        readonly service: InvoicesMethodsPaymentsService,
    ) {}
    get base(): CrudController<InvoiceMethodPayment> {
        return this;
    }
}
