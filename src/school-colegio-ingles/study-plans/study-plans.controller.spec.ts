import { Test, TestingModule } from '@nestjs/testing';
import { StudyPlansController } from './study-plans.controller';

describe('StudyPlans Controller', () => {
  let controller: StudyPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyPlansController],
    }).compile();

    controller = module.get<StudyPlansController>(StudyPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
