import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPlanConceptChargesController } from './payment-plan-concept-charges.controller';

describe('PaymentPlanConceptChargesController', () => {
  let controller: PaymentPlanConceptChargesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentPlanConceptChargesController],
    }).compile();

    controller = module.get<PaymentPlanConceptChargesController>(PaymentPlanConceptChargesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
