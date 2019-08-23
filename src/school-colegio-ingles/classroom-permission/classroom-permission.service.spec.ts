import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomPermissionService } from './classroom-permission.service';

describe('ClassroomPermissionService', () => {
  let service: ClassroomPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassroomPermissionService],
    }).compile();

    service = module.get<ClassroomPermissionService>(ClassroomPermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
