import { Test, TestingModule } from '@nestjs/testing';
import { CreditNoteSchoolController } from './credit-note-school.controller';

describe('CreditNoteSchoolController', () => {
  let controller: CreditNoteSchoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditNoteSchoolController],
    }).compile();

    controller = module.get<CreditNoteSchoolController>(CreditNoteSchoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
