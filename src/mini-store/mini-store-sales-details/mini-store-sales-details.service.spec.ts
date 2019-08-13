import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreSalesDetailsService } from './mini-store-sales-details.service';

describe('MiniStoreSalesDetailsService', () => {
  let service: MiniStoreSalesDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStoreSalesDetailsService],
    }).compile();

    service = module.get<MiniStoreSalesDetailsService>(MiniStoreSalesDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
