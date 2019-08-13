import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreInvoicesService } from './mini-store-invoices.service';

describe('MiniStoreInvoicesService', () => {
  let service: MiniStoreInvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStoreInvoicesService],
    }).compile();

    service = module.get<MiniStoreInvoicesService>(MiniStoreInvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
