import { Test, TestingModule } from '@nestjs/testing';
import { FixedAssetsController } from './fixed-assets.controller';

describe('FixedAssets Controller', () => {
  let controller: FixedAssetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixedAssetsController],
    }).compile();

    controller = module.get<FixedAssetsController>(FixedAssetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
