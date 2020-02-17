import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SystemTypeExtraChargesService } from './system-type-extra-charges.service';
import { SystemTypeExtraCharges } from './entities/system-type-extra-charges.entity';

@Crud({
    model: {
        type: SystemTypeExtraCharges,
    },
    query: {
        join: {
            systemTyExCharCharge: {},
        },
    },
})
@Controller()
export class SystemTypeExtraChargesController implements CrudController<SystemTypeExtraCharges> {
    constructor(readonly service: SystemTypeExtraChargesService) {
    }

    get base(): CrudController<SystemTypeExtraCharges> {
        return this;
    }
}
