import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Cities } from './entities/cities.entity';
import { CitiesService } from './cities.service';

@Crud({
  model: {
    type: Cities,
  },
  query: {
    join: {
      state: {},
      'state.country': {},
    },
  },
})
@Controller()
export class CitiesController implements CrudController<Cities> {
  constructor(
    readonly service: CitiesService,
  ) {
  }

  get base(): CrudController<Cities> {
    return this;
  }

}
