import { Test, TestingModule } from '@nestjs/testing';
import { BranchCompanyController } from './branch-company.controller';

describe('BranchCompany Controller', () => {
  let controller: BranchCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchCompanyController],
    }).compile();

    controller = module.get<BranchCompanyController>(BranchCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
