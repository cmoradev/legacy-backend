import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SalesReturns } from './entities/sales-returns.entity';
import { MiniStoreSalesReturnsService } from './mini-store-sales-returns.service';

@Crud({
  model: {
    type: SalesReturns,
  },
  query: {
    join: {
      sale: {},
      details: {},
      'details.saleDetail': {},
      'details.saleDetail.miniStoreProduct': {},
    },
  },
})
@Controller()
export class MiniStoreSalesReturnsController implements CrudController<SalesReturns> {
  constructor(public service: MiniStoreSalesReturnsService) {
  }
}
