import { Test, TestingModule } from '@nestjs/testing';
import { FixedAssetsAssignmentsController } from './fixed-assets-assignments.controller';

describe('Assignments Controller', () => {
  let controller: FixedAssetsAssignmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixedAssetsAssignmentsController],
    }).compile();

    controller = module.get<FixedAssetsAssignmentsController>(FixedAssetsAssignmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
