import { Test, TestingModule } from '@nestjs/testing';
import { ResponsiveLettersService } from './responsive-letters.service';

describe('ResponsiveLettersService', () => {
  let service: ResponsiveLettersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsiveLettersService],
    }).compile();

    service = module.get<ResponsiveLettersService>(ResponsiveLettersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
