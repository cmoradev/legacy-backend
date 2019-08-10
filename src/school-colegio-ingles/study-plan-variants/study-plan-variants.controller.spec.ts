import { Test, TestingModule } from '@nestjs/testing';
import { StudyPlanVariantsController } from './study-plan-variants.controller';

describe('StudyPlanVariants Controller', () => {
  let controller: StudyPlanVariantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyPlanVariantsController],
    }).compile();

    controller = module.get<StudyPlanVariantsController>(StudyPlanVariantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
