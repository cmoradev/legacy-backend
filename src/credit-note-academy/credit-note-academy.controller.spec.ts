import { Test, TestingModule } from '@nestjs/testing';
import { CreditNoteAcademyController } from './credit-note-academy.controller';

describe('CreditNoteAcademyController', () => {
  let controller: CreditNoteAcademyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditNoteAcademyController],
    }).compile();

    controller = module.get<CreditNoteAcademyController>(CreditNoteAcademyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
