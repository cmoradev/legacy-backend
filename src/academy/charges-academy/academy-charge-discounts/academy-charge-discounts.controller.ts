import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeDiscounts } from './entities/academy-charge-discounts.entity';
import { AcademyChargeDiscountsService } from './academy-charge-discounts.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
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
