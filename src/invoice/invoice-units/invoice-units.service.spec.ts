import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceUnitsService } from './invoice-units.service';

describe('InvoiceUnitsService', () => {
  let service: InvoiceUnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceUnitsService],
    }).compile();

    service = module.get<InvoiceUnitsService>(InvoiceUnitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
