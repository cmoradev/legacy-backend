import { Test, TestingModule } from '@nestjs/testing';
import { MiniStorePricesListsController } from './mini-store-prices-lists.controller';

describe('MiniStorePricesLists Controller', () => {
  let controller: MiniStorePricesListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniStorePricesListsController],
    }).compile();

    controller = module.get<MiniStorePricesListsController>(MiniStorePricesListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
