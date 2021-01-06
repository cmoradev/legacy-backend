import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPlanConceptChargesService } from './payment-plan-concept-charges.service';

describe('PaymentPlanConceptChargesService', () => {
  let service: PaymentPlanConceptChargesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentPlanConceptChargesService],
    }).compile();

    service = module.get<PaymentPlanConceptChargesService>(PaymentPlanConceptChargesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
