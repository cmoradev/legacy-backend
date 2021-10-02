import { Test, TestingModule } from '@nestjs/testing';
import { CreditNoteStoreService } from './credit-note-store.service';

describe('CreditNoteStoreService', () => {
  let service: CreditNoteStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditNoteStoreService],
    }).compile();

    service = module.get<CreditNoteStoreService>(CreditNoteStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
