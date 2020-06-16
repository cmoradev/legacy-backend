import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyInscriptionChargesEntity } from './entites/academy-inscription-charges.entity';
import { IncriptionAcademyChargeDetailsExtraChargeService } from './inscription-academy-charge-details-extra-charge.service';

@Crud({
    model: {
        type: AcademyInscriptionChargesEntity,
    },
    query: {
        limit: 200,
        join: {},
    },
})
@Controller()
export class AcademyInscriptionChargesController implements CrudController<AcademyInscriptionChargesEntity> {
    constructor(
        readonly service: IncriptionAcademyChargeDetailsExtraChargeService,
    ) {
    }

    get base(): CrudController<AcademyInscriptionChargesEntity> {
        return this;
    }
}
