import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolPaymentCharge } from './entities/school-payment-charge.entity';
import { SchoolPaymentsChargesService } from './school-payments-charges.service';

@Crud({
  model: {
    type: SchoolPaymentCharge,
  },
  query: {
    limit: 10,
    join: {},
  },
})
@Controller()
export class SchoolPaymentsChargesController implements CrudController<SchoolPaymentCharge> {
  constructor(
    readonly service: SchoolPaymentsChargesService,
  ) {
  }

  get base(): CrudController<SchoolPaymentCharge> {
    return this;
  }
}
