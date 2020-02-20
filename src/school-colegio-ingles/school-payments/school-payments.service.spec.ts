import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPaymentsService } from './school-payments.service';

describe('SchoolPaymentsService', () => {
  let service: SchoolPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolPaymentsService],
    }).compile();

    service = module.get<SchoolPaymentsService>(SchoolPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
