import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargesMethodsPayments } from './entities/school-charges-methods-payments.entity';
import { SchoolChargesMethodsPaymentsService } from './school-charges-methods-payments.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
@Crud({
    model: {
        type: SchoolChargesMethodsPayments,
    },
    query: {
        limit: 200,
        join: {
            Bank: {},
            invoiceMethodPayment: {},
            schoolChargePayment: {},
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
