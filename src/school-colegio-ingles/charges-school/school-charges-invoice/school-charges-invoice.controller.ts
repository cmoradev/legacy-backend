import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargesInvoice } from './entities/school-charges-invoice.entity';
import { SchoolChargesInvoiceService } from './school-charges-invoice.service';

@Crud({
    model: {
        type: SchoolChargesInvoice,
    },
    query: {
        limit: 200,
        join: {
            schoolChargePayment: {},
            schoolCharge: {},
            agentBilling: {},
            agentCanceling: {},
        },
    },
})

@Controller()
export class SchoolChargesInvoiceController implements CrudController<SchoolChargesInvoice> {
    constructor(
        readonly service: SchoolChargesInvoiceService,
    ) {
    }

    get base(): CrudController<SchoolChargesInvoice> {
        return this;
    }
}
