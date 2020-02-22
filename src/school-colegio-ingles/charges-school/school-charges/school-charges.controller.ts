import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolCharge } from './entities/school-charge.entity';
import { SchoolChargesService } from './school-charges.service';

@Crud({
    model: {
        type: SchoolCharge,
    },
    query: {
        limit: 200,
        join: {
            schoolCampus: {},
            schoolCycle: {},
            cashier: {},
            cashierCancellation: {},
            schoolStudent: {},
            schoolChargesDetails: {},
            schoolChargesPayments: {},
            schoolChargesInvoice: {},
        },
    },
})
@Controller()
export class SchoolChargesController implements CrudController<SchoolCharge> {
    constructor(
        readonly service: SchoolChargesService,
    ) {
    }

    get base(): CrudController<SchoolCharge> {
        return this;
    }
}
