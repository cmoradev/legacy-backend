import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreClassificationsService } from './mini-store-classifications.service';

describe('MiniStoreClassificationsService', () => {
  let service: MiniStoreClassificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniStoreClassificationsService],
    }).compile();

    service = module.get<MiniStoreClassificationsService>(MiniStoreClassificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
