import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Country } from './entities/country.entity';
import { CountriesService } from './countries.service';

@Crud({
  model: {
    type: Country,
  },
  params: {
    countryId: {
      field: 'country_id',
      primary: true,
      type: 'number',
    },
  },
  query: {
    join: {
      states: {},
    },
  },
})
@Controller()
export class CountriesController implements CrudController<Country> {
  constructor(
    readonly service: CountriesService,
  ) {
  }

  get base(): CrudController<Country> {
    return this;
  }
}
