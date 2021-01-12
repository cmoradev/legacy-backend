import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPaymentsChargesController } from './school-payments-charges.controller';

describe('SchoolPaymentsChargesController', () => {
  let controller: SchoolPaymentsChargesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolPaymentsChargesController],
    }).compile();

    controller = module.get<SchoolPaymentsChargesController>(SchoolPaymentsChargesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
