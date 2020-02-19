import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeDetails } from '../academy-charge-details/entities/academy-charge-details.entity';
import { AcademyChargeDetailsService } from '../academy-charge-details/academy-charge-details.service';
import { AcademyChargeDiscounts } from './entities/academy-charge-discounts.entity';
import { AcademyChargeDiscountsService } from './academy-charge-discounts.service';

@Crud({
  model: {
    type: AcademyChargeDiscounts,
  },
  query: {
    limit: 200,
    join: {},
  },
})
@Controller()
export class AcademyChargeDiscountsController implements CrudController<AcademyChargeDiscounts> {
  constructor(
    readonly service: AcademyChargeDiscountsService,
  ) {
  }

  get base(): CrudController<AcademyChargeDiscounts> {
    return this;
  }
}
