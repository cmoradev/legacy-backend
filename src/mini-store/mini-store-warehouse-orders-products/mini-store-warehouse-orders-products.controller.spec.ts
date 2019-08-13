import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreWarehouseOrdersProductsController } from './mini-store-warehouse-orders-products.controller';

describe('MiniStoreWarehouseOrdersProducts Controller', () => {
  let controller: MiniStoreWarehouseOrdersProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStoreWarehouseOrdersProductsController],
    }).compile();

    controller = module.get<MiniStoreWarehouseOrdersProductsController>(MiniStoreWarehouseOrdersProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
