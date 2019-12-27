import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeDetails } from './entities/academy-charge-details.entity';
import { AcademyChargeDetailsService } from './academy-charge-details.service';

@Crud({
  model: {
    type: AcademyChargeDetails,
  },
  query: {
    limit: 200,
    join: {},
  },
})
@Controller()
export class AcademyChargeDetailsController implements CrudController<AcademyChargeDetails> {
  constructor(
    readonly service: AcademyChargeDetailsService,
  ) {
  }

  get base(): CrudController<AcademyChargeDetails> {
    return this;
  }
}
