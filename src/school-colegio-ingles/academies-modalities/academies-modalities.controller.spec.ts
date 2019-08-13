import { Test, TestingModule } from '@nestjs/testing';
import { AcademiesModalitiesController } from './academies-modalities.controller';

describe('AcademiesModalities Controller', () => {
  let controller: AcademiesModalitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademiesModalitiesController],
    }).compile();

    controller = module.get<AcademiesModalitiesController>(AcademiesModalitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
