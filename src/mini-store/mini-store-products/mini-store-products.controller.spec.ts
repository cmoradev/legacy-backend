import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreProductsController } from './mini-store-products.controller';

describe('MiniStoreProducts Controller', () => {
  let controller: MiniStoreProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStoreProductsController],
    }).compile();

    controller = module.get<MiniStoreProductsController>(MiniStoreProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
