import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargesDetailsExtraCharges } from './entities/school-charges-details-extra-charges.entity';
import { SchoolChargesDetailsExtraChargesService } from './school-charges-details-extra-charges.service';

@Crud({
    model: {
        type: SchoolChargesDetailsExtraCharges,
    },
    query: {
        limit: 10,
        join: {
            schoolChargeDetails: {eager: false},
            systemExtraCharges: {eager: false},
        },
    },
})
@Controller('school-charges-details-extra-charges')
export class SchoolChargesDetailsExtraChargesController implements CrudController<SchoolChargesDetailsExtraCharges> {
    constructor(
        readonly service: SchoolChargesDetailsExtraChargesService,
    ) {
    }

    get base(): CrudController<SchoolChargesDetailsExtraCharges> {
        return this;
    }
}
