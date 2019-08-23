import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentIncriptionService } from './assignment-incription.service';

describe('AssignmentIncriptionService', () => {
  let service: AssignmentIncriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentIncriptionService],
    }).compile();

    service = module.get<AssignmentIncriptionService>(AssignmentIncriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
