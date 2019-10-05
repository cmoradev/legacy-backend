import { Test, TestingModule } from '@nestjs/testing';
import { BranchCompaniesService } from './branch-companies.service';

describe('BranchCompanyService', () => {
  let service: BranchCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchCompaniesService],
    }).compile();

    service = module.get<BranchCompaniesService>(BranchCompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
