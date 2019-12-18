import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InscriptionStatus } from './entities/inscription-status.entity';
import { InscriptionStatusService } from './inscription-status.service';

@Crud({
  model: {
    type: InscriptionStatus,
  },
  query: {
    limit: 200,
    join: {},
  },
})
@Controller()
export class InscriptionStatusController implements CrudController<InscriptionStatus> {
  constructor(
    readonly service: InscriptionStatusService,
  ) {
  }

  get base(): CrudController<InscriptionStatus> {
    return this;
  }
}
