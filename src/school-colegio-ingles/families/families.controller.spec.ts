import { Test, TestingModule } from '@nestjs/testing';
import { FamiliesController } from './families.controller';

describe('Families Controller', () => {
  let controller: FamiliesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamiliesController],
    }).compile();

    controller = module.get<FamiliesController>(FamiliesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
