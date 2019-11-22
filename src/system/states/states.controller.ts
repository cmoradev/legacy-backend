import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { States } from './entities/states.entity';
import { StatesService } from './states.service';

@Crud({
  model: {
    type: States,
  },
  query: {
    join: {
      country: {},
      cities: {},
    },
  },
})
@Controller()
export class StatesController implements CrudController<States> {
  constructor(
    readonly service: StatesService,
  ) {
  }

  get base(): CrudController<States> {
    return this;
  }
}
