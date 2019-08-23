import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentIncriptionController } from './assignment-incription.controller';

describe('AssignmentIncription Controller', () => {
  let controller: AssignmentIncriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentIncriptionController],
    }).compile();

    controller = module.get<AssignmentIncriptionController>(AssignmentIncriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
