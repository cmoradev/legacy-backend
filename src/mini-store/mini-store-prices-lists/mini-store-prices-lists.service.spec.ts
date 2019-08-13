import { Test, TestingModule } from '@nestjs/testing';
import { MiniStorePricesListsService } from './mini-store-prices-lists.service';

describe('MiniStorePricesListsService', () => {
  let service: MiniStorePricesListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStorePricesListsService],
    }).compile();

    service = module.get<MiniStorePricesListsService>(MiniStorePricesListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
