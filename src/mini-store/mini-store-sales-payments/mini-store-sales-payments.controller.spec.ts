import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreSalesPaymentsController } from './mini-store-sales-payments.controller';

describe('MiniStoreSalesPayments Controller', () => {
  let controller: MiniStoreSalesPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStoreSalesPaymentsController],
    }).compile();

    controller = module.get<MiniStoreSalesPaymentsController>(MiniStoreSalesPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
