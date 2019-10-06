import { Test, TestingModule } from '@nestjs/testing';
import { FixedAssetsAssignmentsService } from './fixed-assets-assignments.service';

describe('AssignmentsService', () => {
  let service: FixedAssetsAssignmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixedAssetsAssignmentsService],
    }).compile();

    service = module.get<FixedAssetsAssignmentsService>(FixedAssetsAssignmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
