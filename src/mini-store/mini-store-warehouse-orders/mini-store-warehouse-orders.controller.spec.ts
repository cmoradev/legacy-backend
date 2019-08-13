import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreWarehouseOrdersController } from './mini-store-warehouse-orders.controller';

describe('MiniStoreWarehouseOrders Controller', () => {
  let controller: MiniStoreWarehouseOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStoreWarehouseOrdersController],
    }).compile();

    controller = module.get<MiniStoreWarehouseOrdersController>(MiniStoreWarehouseOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
