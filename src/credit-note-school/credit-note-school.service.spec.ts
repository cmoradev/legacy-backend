import { Test, TestingModule } from '@nestjs/testing';
import { CreditNoteSchoolService } from './credit-note-school.service';

describe('CreditNoteSchoolService', () => {
  let service: CreditNoteSchoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditNoteSchoolService],
    }).compile();

    service = module.get<CreditNoteSchoolService>(CreditNoteSchoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
