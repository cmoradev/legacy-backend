import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreSalesMethodsPaymentsService } from './mini-store-sales-methods-payments.service';

describe('MiniStoreSalesMethodsPaymentsService', () => {
  let service: MiniStoreSalesMethodsPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStoreSalesMethodsPaymentsService],
    }).compile();

    service = module.get<MiniStoreSalesMethodsPaymentsService>(MiniStoreSalesMethodsPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
