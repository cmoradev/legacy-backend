import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargesMethodsPayments } from './entities/school-charges-methods-payments.entity';
import { SchoolChargesMethodsPaymentsService } from './school-charges-methods-payments.service';

@Crud({
    model: {
        type: SchoolChargesMethodsPayments,
    },
    query: {
        limit: 10,
        join: {
            Bank: {eager: false},
            invoiceMethodPayment: {eager: false},
            schoolChargePayment: {eager: false},
        },
    },
})
@Controller()
export class SchoolChargesMethodsPaymentsController implements CrudController<SchoolChargesMethodsPayments> {
    constructor(
        readonly service: SchoolChargesMethodsPaymentsService,
    ) {
    }

    get base(): CrudController<SchoolChargesMethodsPayments> {
        return this;
    }
}
