import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargesDetailsExtraCharges } from './entities/school-charges-details-extra-charges.entity';
import { SchoolChargesDetailsExtraChargesService } from './school-charges-details-extra-charges.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
    model: {
        type: SchoolChargesDetailsExtraCharges,
    },
    query: {
        limit: 200,
        join: {
            schoolChargeDetails: {},
            systemExtraCharges: {},
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
