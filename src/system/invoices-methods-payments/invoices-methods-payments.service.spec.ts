import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesMethodsPaymentsService } from './invoices-methods-payments.service';

describe('InvoicesMethodsPaymentsService', () => {
  let service: InvoicesMethodsPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesMethodsPaymentsService],
    }).compile();

    service = module.get<InvoicesMethodsPaymentsService>(InvoicesMethodsPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
