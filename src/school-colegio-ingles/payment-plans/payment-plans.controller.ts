import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PaymentPlan } from './entities/payment-plan.entity';
import { PaymentPlansService } from './payment-plans.service';

@Crud({
  model: {
    type: PaymentPlan,
  },
  query: {
    join: {
      studyPlan: {},
      grades: {},
      level: {},
      paymentPlanConcepts: {},
      'level.campus': {},
    },
  },
})
@Controller()
export class PaymentPlansController implements CrudController<PaymentPlan> {
  constructor(readonly service: PaymentPlansService) {
  }
  get base(): CrudController<PaymentPlan> {
    return this;
  }
}
