import { Test, TestingModule } from '@nestjs/testing';
import { IncidentClassificationController } from './incident-classification.controller';

describe('IncidentClassification Controller', () => {
  let controller: IncidentClassificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncidentClassificationController],
    }).compile();

    controller = module.get<IncidentClassificationController>(IncidentClassificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
