import { Test, TestingModule } from '@nestjs/testing';
import { BranchCompaniesController } from './branch-companies.controller';

describe('BranchCompany Controller', () => {
  let controller: BranchCompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchCompaniesController],
    }).compile();

    controller = module.get<BranchCompaniesController>(BranchCompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
