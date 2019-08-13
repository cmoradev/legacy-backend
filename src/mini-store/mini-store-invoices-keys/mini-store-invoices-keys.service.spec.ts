import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreInvoicesKeysService } from './mini-store-invoices-keys.service';

describe('MiniStoreInvoicesKeysService', () => {
  let service: MiniStoreInvoicesKeysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStoreInvoicesKeysService],
    }).compile();

    service = module.get<MiniStoreInvoicesKeysService>(MiniStoreInvoicesKeysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
