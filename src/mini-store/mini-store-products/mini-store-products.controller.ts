import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreProduct } from './entities/mini-store-product.entity';
import { MiniStoreProductsService } from './mini-store-products.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
import { Pagination } from 'nestjs-typeorm-paginate';

// @UseGuards(JwtGuard)
@Crud({
  model: {
    type: MiniStoreProduct,
  },
  query: {
    join: {
      storeClassification: {},
      storePriceList: {},
      storeInvoiceKey: {},
      miniStoreWarehouseOrdersProducts: {},
      miniStoreSaleDetails: {},
      miniStoreProductsProvider: {},
      'miniStoreProductsProvider.provider': {},
      branchOffice: {},
    },
  },

})
@Controller()
export class MiniStoreProductsController implements CrudController<MiniStoreProduct> {
  constructor(
    readonly service: MiniStoreProductsService,
  ) {
  }

  get base(): CrudController<MiniStoreProduct> {
    return this;
  }

  @Get('/products-list-report')
  public productsList(@Query() query?: { priceListID: string, classificationID: string, onlyData?: boolean }) {
    return this.service.ProductsList(query);
  }

  @Get('count-what-was-sold')
  async index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: { branchOfficeId: number, startDate: string, endDate: string },
  ): Promise<any> { // Promise<Pagination<MiniStoreProduct>> {
    limit = limit > 100 ? 100 : limit;
    return this.service.paginate({
      page,
      limit,
      route: 'http://cats.com/cats',
    }, query);
  }
}
