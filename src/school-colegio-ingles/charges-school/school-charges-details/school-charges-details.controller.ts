import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargeDetails } from './entities/school-charge-details.entity';
import { SchoolChargesDetailsService } from './school-charges-details.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
    model: {
        type: SchoolChargeDetails,
    },
    query: {
        limit: 200,
        join: {
            schoolCharge: {},
            extraCharges: {},
            schoolPayment: {},
        },
    },
})
@Controller()
export class SchoolChargesDetailsController implements CrudController<SchoolChargeDetails> {
    constructor(
        readonly service: SchoolChargesDetailsService,
    ) {
    }

    get base(): CrudController<SchoolChargeDetails> {
        return this;
    }
}
