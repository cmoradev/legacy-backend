import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyInscriptionConcepts } from './entities/academy-inscription-concepts.entity';
import { AcademyInscriptionConceptsService } from './academy-inscription-concepts.service';
@Crud({
  model: {
    type: AcademyInscriptionConcepts,
  },
  query: {
    limit: 200,
    join: {},
  },
})
@Controller()
export class AcademyInscriptionConceptsController implements CrudController<AcademyInscriptionConcepts> {
  constructor(
    readonly service: AcademyInscriptionConceptsService,
  ) {
  }

  get base(): CrudController<AcademyInscriptionConcepts> {
    return this;
  }
}
