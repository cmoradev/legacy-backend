import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PaymentPlanConcept } from './entities/payment-plan-concept.entity';
import { PaymentPlanConceptsService } from './payment-plan-concepts.service';

@Crud({
  model: {
    type: PaymentPlanConcept,
  },
})
@Controller()
export class PaymentPlanConceptsController implements CrudController<PaymentPlanConcept> {
  constructor(
    readonly service: PaymentPlanConceptsService,
  ) { }
  get base(): CrudController<PaymentPlanConcept> {
    return this;
  }
}
