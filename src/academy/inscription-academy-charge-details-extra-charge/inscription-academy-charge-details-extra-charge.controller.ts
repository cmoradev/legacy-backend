import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InscriptionAcademyChargeDetailsExtraChargeEntity } from './entites/inscription-academy-charge-details-extra-charge.entity';
import { IncriptionAcademyChargeDetailsExtraChargeService } from './inscription-academy-charge-details-extra-charge.service';

@Crud({
    model: {
        type: InscriptionAcademyChargeDetailsExtraChargeEntity,
    },
    query: {
        limit: 200,
        join: {},
    },
})
@Controller()
export class InscriptionAcademyChargeDetailsExtraChargeController implements CrudController<InscriptionAcademyChargeDetailsExtraChargeEntity> {
    constructor(
        readonly service: IncriptionAcademyChargeDetailsExtraChargeService,
    ) {
    }

    get base(): CrudController<InscriptionAcademyChargeDetailsExtraChargeEntity> {
        return this;
    }
}
