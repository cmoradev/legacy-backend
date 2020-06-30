import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeDetailsExtraCharge } from './entities/academy-charge-details-extra-charge.entity';
import { AcademyChargeDetailsExtraChargeService } from './academy-charge-details-extra-charge.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
    model: {
        type: AcademyChargeDetailsExtraCharge,
    },
    query: {
        limit: 200,
        join: {},
    },
})
@Controller()
export class AcademyChargeDetailsExtraChargeController implements CrudController<AcademyChargeDetailsExtraCharge> {
    constructor(
        readonly service: AcademyChargeDetailsExtraChargeService,
    ) {
    }

    get base(): CrudController<AcademyChargeDetailsExtraCharge> {
        return this;
    }
}
