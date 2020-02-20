import { Test, TestingModule } from '@nestjs/testing';
import { MiniStoreSalesController } from './mini-store-sales.controller';

describe('MiniStoreSales Controller', () => {
  let controller: MiniStoreSalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStoreSalesController],
    }).compile();

    controller = module.get<MiniStoreSalesController>(MiniStoreSalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
