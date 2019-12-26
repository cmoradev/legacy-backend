import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyInscription } from './entities/academy-inscription.entity';
import { AcademyInscriptionService } from './academy-inscription.service';

@Crud({
  model: {
    type: AcademyInscription,
  },
  query: {
    limit: 200,
    join: {
      acInsActivity: {},
      acInsStudent: {},
      acInsCampus: {},
      acInsActGroup: {},
      acInsAgentCreator: {},
      acInsAgentDown: {},
      acInsStatusIns: {},
      acInsCycle: {},
    },
  },
})
@Controller()
export class AcademyInscriptionController implements CrudController<AcademyInscription> {
  constructor(
    readonly service: AcademyInscriptionService,
  ) {
  }

  get base(): CrudController<AcademyInscription> {
    return this;
  }
}
