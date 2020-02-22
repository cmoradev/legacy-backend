import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargePayment } from './entities/school-charge-payment.entity';
import { SchoolChargesPaymentsService } from './school-charges-payments.service';

@Crud({
    model: {
        type: SchoolChargePayment,
    },
    query: {
        limit: 200,
        join: {
            schoolCharge: {},
            paymentStatus: {},
            methodsPayments: {},
            cashierCharge: {},
            cashierChargeCancellation: {},
            schoolChargesInvoice: {},
        },
    },
})
@Controller()
export class SchoolChargesPaymentsController implements CrudController<SchoolChargePayment> {
    constructor(
        readonly service: SchoolChargesPaymentsService,
    ) {
    }

    get base(): CrudController<SchoolChargePayment> {
        return this;
    }
}

