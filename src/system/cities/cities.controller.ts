import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Cities } from './entities/cities.entity';
import { CitiesService } from './cities.service';

@Crud({
  model: {
    type: Cities,
  },
  query: {
    limit: 10,
    join: {
      state: {eager: false},
      'state.country': {eager: false},
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
