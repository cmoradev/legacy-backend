import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreClassificationsController } from './mini-store-classifications.controller';

describe('MiniStoreClassifications Controller', () => {
  let controller: MiniStoreClassificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStoreClassificationsController],
    }).compile();

    controller = module.get<MiniStoreClassificationsController>(MiniStoreClassificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
