import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyInscriptionConceptCharges } from './entites/academy-inscription-concept-charges.entity';
import { IncriptionAcademyChargeDetailsExtraChargeService } from './inscription-academy-charge-details-extra-charge.service';

@Crud({
    model: {
        type: AcademyInscriptionConceptCharges,
    },
    query: {
        limit: 200,
        join: {},
    },
})
@Controller()
export class AcademyInscriptionChargesController implements CrudController<AcademyInscriptionConceptCharges> {
    constructor(
        readonly service: IncriptionAcademyChargeDetailsExtraChargeService,
    ) {
    }

    get base(): CrudController<AcademyInscriptionConceptCharges> {
        return this;
    }
}
