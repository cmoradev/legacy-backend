import { options } from '@hapi/joi';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreProduct } from './entities/mini-store-product.entity';
import { MiniStoreProductsService } from './mini-store-products.service';
import { StoreProductsListReport } from './reports/products-list.report';
import { QueryReportProducts } from './types/productsQuery';

@Crud({
  model: {
    type: MiniStoreProduct,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null,
      },
    },
    limit: 10,
    join: {
      storeClassification: { eager: false },
      storePriceList: { eager: false },
      storeInvoiceKey: { eager: false },
      miniStoreWarehouseOrdersProducts: { eager: false },
      miniStoreSaleDetails: { eager: false },
      miniStoreProductsProvider: { eager: false },
      'miniStoreProductsProvider.provider': { eager: false },
      branchOffice: { eager: false },
    },
  },
})
@Controller()
export class MiniStoreProductsController
  implements CrudController<MiniStoreProduct> {
  constructor(readonly service: MiniStoreProductsService) {}

  get base(): CrudController<MiniStoreProduct> {
    return this;
  }

  @Delete('soft-deleted/:id')
  public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }

  @Put('soft-restore/:id')
  public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softRestoreOne(id);
  }

  @Get('/products-list-report')
  public productsList(
    @Query()
    query?: {
      priceListID: string;
      classificationID: string;
      onlyData?: boolean;
    },
  ) {
    return this.service.ProductsList(query);
  }

  @Get('count-what-was-sold')
  async index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query()
    query: { branchOfficeId: number; startDate: string; endDate: string },
  ): Promise<any> {
    // Promise<Pagination<MiniStoreProduct>> {
    limit = limit > 100 ? 100 : limit;
    return this.service.paginate(
      {
        page,
        limit,
        route: 'http://cats.com/cats',
      },
      query,
    );
  }
  @Get('products_list')
  public async products_list(
    @Res() res,
    @Query() options: QueryReportProducts,
  ) {
    const result = await this.service.reportProducts(options);

    if (options?.isExported) {
      const conceptStatusExcel = new StoreProductsListReport(result);
      const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
        filename: `products.xlsx`,
      });
      const report = {
        src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
          buffer,
        ).toString('base64')}`,
        type: 'excel',
        name: `products`,
      };
      return res.send({ report, result });
    } else {
      return res.send({ report: false, result });
    }
  }
}
