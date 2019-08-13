import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentsSubjectsController } from './assignments-subjects.controller';

describe('AssignmentsSubjects Controller', () => {
  let controller: AssignmentsSubjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentsSubjectsController],
    }).compile();

    controller = module.get<AssignmentsSubjectsController>(AssignmentsSubjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
