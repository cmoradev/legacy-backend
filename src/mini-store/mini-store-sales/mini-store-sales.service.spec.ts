import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreSalesService } from './mini-store-sales.service';

describe('MiniStoreSalesService', () => {
  let service: MiniStoreSalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStoreSalesService],
    }).compile();

    service = module.get<MiniStoreSalesService>(MiniStoreSalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
