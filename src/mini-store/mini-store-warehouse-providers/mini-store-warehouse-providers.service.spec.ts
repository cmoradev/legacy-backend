import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreWarehouseProvidersService } from './mini-store-warehouse-providers.service';

describe('MiniStoreWarehouseProvidersService', () => {
  let service: MiniStoreWarehouseProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStoreWarehouseProvidersService],
    }).compile();

    service = module.get<MiniStoreWarehouseProvidersService>(MiniStoreWarehouseProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
