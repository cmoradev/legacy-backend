import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreInvoicesKeysController } from './mini-store-invoices-keys.controller';

describe('MiniStoreInvoicesKeys Controller', () => {
  let controller: MiniStoreInvoicesKeysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStoreInvoicesKeysController],
    }).compile();

    controller = module.get<MiniStoreInvoicesKeysController>(MiniStoreInvoicesKeysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
