import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentsSubjectsService } from './assignments-subjects.service';

describe('AssignmentsSubjectsService', () => {
  let service: AssignmentsSubjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentsSubjectsService],
    }).compile();

    service = module.get<AssignmentsSubjectsService>(AssignmentsSubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
