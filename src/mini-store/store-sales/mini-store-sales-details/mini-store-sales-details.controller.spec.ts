import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreSalesDetailsController } from './mini-store-sales-details.controller';

describe('MiniStoreSalesDetails Controller', () => {
  let controller: MiniStoreSalesDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStoreSalesDetailsController],
    }).compile();

    controller = module.get<MiniStoreSalesDetailsController>(MiniStoreSalesDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
