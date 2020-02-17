import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPlanConceptsService } from './payment-plan-concepts.service';

describe('PaymentPlanConceptsService', () => {
  let service: PaymentPlanConceptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentPlanConceptsService],
    }).compile();

    service = module.get<PaymentPlanConceptsService>(PaymentPlanConceptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
