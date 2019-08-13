import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreWarehouseOrdersService } from './mini-store-warehouse-orders.service';

describe('MiniStoreWarehouseOrdersService', () => {
  let service: MiniStoreWarehouseOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStoreWarehouseOrdersService],
    }).compile();

    service = module.get<MiniStoreWarehouseOrdersService>(MiniStoreWarehouseOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
