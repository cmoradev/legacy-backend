import { Test, TestingModule } from '@nestjs/testing';
import { BranchCompanyService } from './branch-company.service';

describe('BranchCompanyService', () => {
  let service: BranchCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchCompanyService],
    }).compile();

    service = module.get<BranchCompanyService>(BranchCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
