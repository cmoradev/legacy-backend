import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';

describe('MiniStoreSalesPaymentsService', () => {
  let service: MiniStoreSalesPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStoreSalesPaymentsService],
    }).compile();

    service = module.get<MiniStoreSalesPaymentsService>(MiniStoreSalesPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
