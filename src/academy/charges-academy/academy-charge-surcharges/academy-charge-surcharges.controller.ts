import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeSurcharges } from './entities/academy-charge-surcharges.entity';
import { AcademyChargeSurchargesService } from './academy-charge-surcharges.service';

@Crud({
  model: {
    type: AcademyChargeSurcharges,
  },
  query: {
    limit: 200,
    join: {},
  },
})
@Controller()
export class AcademyChargeSurchargesController implements CrudController<AcademyChargeSurcharges> {
  constructor(
    readonly service: AcademyChargeSurchargesService,
  ) {
  }

  get base(): CrudController<AcademyChargeSurcharges> {
    return this;
  }
}
