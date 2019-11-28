import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceUnitsController } from './invoice-units.controller';

describe('InvoiceUnits Controller', () => {
  let controller: InvoiceUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceUnitsController],
    }).compile();

    controller = module.get<InvoiceUnitsController>(InvoiceUnitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
