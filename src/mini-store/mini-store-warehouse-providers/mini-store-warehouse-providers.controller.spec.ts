import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreWarehouseProvidersController } from './mini-store-warehouse-providers.controller';

describe('MiniStoreWarehouseProviders Controller', () => {
  let controller: MiniStoreWarehouseProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStoreWarehouseProvidersController],
    }).compile();

    controller = module.get<MiniStoreWarehouseProvidersController>(MiniStoreWarehouseProvidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
