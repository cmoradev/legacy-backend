import { Test, TestingModule } from '@nestjs/testing';
import { CreditNoteAcademyService } from './credit-note-academy.service';

describe('CreditNoteAcademyService', () => {
  let service: CreditNoteAcademyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditNoteAcademyService],
    }).compile();

    service = module.get<CreditNoteAcademyService>(CreditNoteAcademyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
