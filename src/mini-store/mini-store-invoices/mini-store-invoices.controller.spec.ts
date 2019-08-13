import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreInvoicesController } from './mini-store-invoices.controller';

describe('MiniStoreInvoices Controller', () => {
  let controller: MiniStoreInvoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStoreInvoicesController],
    }).compile();

    controller = module.get<MiniStoreInvoicesController>(MiniStoreInvoicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
