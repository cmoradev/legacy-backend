import { Test, TestingModule } from '@nestjs/testing';
import { AcademiesModalitiesService } from './academies-modalities.service';

describe('AcademiesModalitiesService', () => {
  let service: AcademiesModalitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademiesModalitiesService],
    }).compile();

    service = module.get<AcademiesModalitiesService>(AcademiesModalitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
