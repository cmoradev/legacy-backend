import { Test, TestingModule } from '@nestjs/testing';
import { StudyPlanVariantsService } from './study-plan-variants.service';

describe('StudyPlanVariantsService', () => {
  let service: StudyPlanVariantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyPlanVariantsService],
    }).compile();

    service = module.get<StudyPlanVariantsService>(StudyPlanVariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
