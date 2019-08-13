import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreSalesMethodsPaymentsController } from './mini-store-sales-methods-payments.controller';

describe('MiniStoreSalesMethodsPayments Controller', () => {
  let controller: MiniStoreSalesMethodsPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStoreSalesMethodsPaymentsController],
    }).compile();

    controller = module.get<MiniStoreSalesMethodsPaymentsController>(MiniStoreSalesMethodsPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
