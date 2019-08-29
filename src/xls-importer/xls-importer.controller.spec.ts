import { Test, TestingModule } from '@nestjs/testing';
import { XlsImporterController } from './xls-importer.controller';

describe('XlsImporter Controller', () => {
  let controller: XlsImporterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XlsImporterController],
    }).compile();

    controller = module.get<XlsImporterController>(XlsImporterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
