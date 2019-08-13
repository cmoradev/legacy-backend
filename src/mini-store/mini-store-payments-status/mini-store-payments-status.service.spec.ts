import { Test, TestingModule } from '@nestjs/testing';
import { MiniStorePaymentsStatusService } from './mini-store-payments-status.service';

describe('MiniStorePaymentsStatusService', () => {
  let service: MiniStorePaymentsStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStorePaymentsStatusService],
    }).compile();

    service = module.get<MiniStorePaymentsStatusService>(MiniStorePaymentsStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
