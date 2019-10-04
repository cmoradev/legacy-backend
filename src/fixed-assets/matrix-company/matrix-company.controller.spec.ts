import { Test, TestingModule } from '@nestjs/testing';
import { MatrixCompanyController } from './matrix-company.controller';

describe('MatrixCompany Controller', () => {
  let controller: MatrixCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatrixCompanyController],
    }).compile();

    controller = module.get<MatrixCompanyController>(MatrixCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
