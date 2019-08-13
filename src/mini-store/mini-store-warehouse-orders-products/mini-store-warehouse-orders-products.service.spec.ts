import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreWarehouseOrdersProductsService } from './mini-store-warehouse-orders-products.service';

describe('MiniStoreWarehouseOrdersProductsService', () => {
  let service: MiniStoreWarehouseOrdersProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStoreWarehouseOrdersProductsService],
    }).compile();

    service = module.get<MiniStoreWarehouseOrdersProductsService>(MiniStoreWarehouseOrdersProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
