import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPaymentsController } from './school-payments.controller';

describe('SchoolPayments Controller', () => {
  let controller: SchoolPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolPaymentsController],
    }).compile();

    controller = module.get<SchoolPaymentsController>(SchoolPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
