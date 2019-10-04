import { Test, TestingModule } from '@nestjs/testing';
import { MatrixCompaniesService } from './matrix-companies.service';

describe('MatrixCompanyService', () => {
  let service: MatrixCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatrixCompaniesService],
    }).compile();

    service = module.get<MatrixCompaniesService>(MatrixCompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
