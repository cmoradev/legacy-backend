import { Test, TestingModule } from '@nestjs/testing';
import { JobPositionsController } from './job-positions.controller';

describe('JobPositions Controller', () => {
  let controller: JobPositionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPositionsController],
    }).compile();

    controller = module.get<JobPositionsController>(JobPositionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
