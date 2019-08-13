import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreProductsService } from './mini-store-products.service';

describe('MiniStoreProductsService', () => {
  let service: MiniStoreProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStoreProductsService],
    }).compile();

    service = module.get<MiniStoreProductsService>(MiniStoreProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
