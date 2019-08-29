import { Test, TestingModule } from '@nestjs/testing';
import { XlsImporterService } from './xls-importer.service';

describe('XlsImporterService', () => {
  let service: XlsImporterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XlsImporterService],
    }).compile();

    service = module.get<XlsImporterService>(XlsImporterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
