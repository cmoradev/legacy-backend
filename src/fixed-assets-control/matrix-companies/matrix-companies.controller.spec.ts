import { Test, TestingModule } from '@nestjs/testing';
import { MatrixCompaniesController } from './matrix-companies.controller';

describe('MatrixCompany Controller', () => {
  let controller: MatrixCompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatrixCompaniesController],
    }).compile();

    controller = module.get<MatrixCompaniesController>(MatrixCompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
