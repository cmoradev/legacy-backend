import { Test, TestingModule } from '@nestjs/testing';
import { IncidentClassificationService } from './incident-classification.service';

describe('IncidentClassificationService', () => {
  let service: IncidentClassificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncidentClassificationService],
    }).compile();

    service = module.get<IncidentClassificationService>(IncidentClassificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
