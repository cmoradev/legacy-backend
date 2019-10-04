import { Test, TestingModule } from '@nestjs/testing';
import { MatrixCompanyService } from './matrix-company.service';

describe('MatrixCompanyService', () => {
  let service: MatrixCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatrixCompanyService],
    }).compile();

    service = module.get<MatrixCompanyService>(MatrixCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
