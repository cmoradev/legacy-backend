import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPlanConceptsController } from './payment-plan-concepts.controller';

describe('PaymentPlanConcepts Controller', () => {
  let controller: PaymentPlanConceptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentPlanConceptsController],
    }).compile();

    controller = module.get<PaymentPlanConceptsController>(PaymentPlanConceptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
