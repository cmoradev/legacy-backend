import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesMethodsPaymentsController } from './invoices-methods-payments.controller';

describe('InvoicesMethodsPayments Controller', () => {
  let controller: InvoicesMethodsPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesMethodsPaymentsController],
    }).compile();

    controller = module.get<InvoicesMethodsPaymentsController>(InvoicesMethodsPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
