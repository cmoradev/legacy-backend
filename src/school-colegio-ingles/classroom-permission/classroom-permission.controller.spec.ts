import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomPermissionController } from './classroom-permission.controller';

describe('ClassroomPermission Controller', () => {
  let controller: ClassroomPermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassroomPermissionController],
    }).compile();

    controller = module.get<ClassroomPermissionController>(ClassroomPermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
