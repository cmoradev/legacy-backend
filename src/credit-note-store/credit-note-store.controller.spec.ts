import { Test, TestingModule } from '@nestjs/testing';
import { CreditNoteStoreController } from './credit-note-store.controller';

describe('CreditNoteStoreController', () => {
  let controller: CreditNoteStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditNoteStoreController],
    }).compile();

    controller = module.get<CreditNoteStoreController>(CreditNoteStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
