import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPaymentsChargesService } from './school-payments-charges.service';

describe('SchoolPaymentsChargesService', () => {
  let service: SchoolPaymentsChargesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolPaymentsChargesService],
    }).compile();

    service = module.get<SchoolPaymentsChargesService>(SchoolPaymentsChargesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
