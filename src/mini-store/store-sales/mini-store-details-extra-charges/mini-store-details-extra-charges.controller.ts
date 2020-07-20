import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreDetailsExtraCharges } from './entities/mini-store-details-extra-charges.entity';
import { MiniStoreDetailsExtraChargesService } from './mini-store-details-extra-charges.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStoreDetailsExtraCharges,
    },
    query: {
        join: {
            miniSaleChargeDetails: {},
            systemExtraCharges: {},
        },
    },
})
@Controller('school-charges-details-extra-charges')
export class MiniStoreDetailsExtraChargesController implements CrudController<MiniStoreDetailsExtraCharges> {
    constructor(
        readonly service: MiniStoreDetailsExtraChargesService,
    ) {
    }

    get base(): CrudController<MiniStoreDetailsExtraCharges> {
        return this;
    }
}
