import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyConcepts } from './entities/academy-concepts.entity';
import { AcademyConceptsService } from './academy-concepts.service';

@Crud({
  model: {
    type: AcademyConcepts,
  },
  query: {
    join: {},
  },
})
@Controller()
export class AcademyConceptsController implements CrudController<AcademyConcepts> {
  constructor(
    readonly service: AcademyConceptsService,
  ) {
  }

  get base(): CrudController<AcademyConcepts> {
    return this;
  }
}
