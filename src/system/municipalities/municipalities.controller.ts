import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Municipalities } from './entities/municipalities.entity';
import { MunicipalitiesService } from './municipalities.service';

@Crud({
  model: {
    type: Municipalities,
  },
  query: {
    limit: 10,
    join: {},
  },
})
@Controller()
export class MunicipalitiesController implements CrudController<Municipalities> {
  constructor(
    readonly service: MunicipalitiesService,
  ) {
  }

  get base(): CrudController<Municipalities> {
    return this;
  }

}
