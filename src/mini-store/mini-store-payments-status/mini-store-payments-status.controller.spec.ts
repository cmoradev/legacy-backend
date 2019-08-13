import { Test, TestingModule } from '@nestjs/testing';
import { MiniStorePaymentsStatusController } from './mini-store-payments-status.controller';

describe('MiniStorePaymentsStatus Controller', () => {
  let controller: MiniStorePaymentsStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStorePaymentsStatusController],
    }).compile();

    controller = module.get<MiniStorePaymentsStatusController>(MiniStorePaymentsStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
