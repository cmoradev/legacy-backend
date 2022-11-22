import { Decimal } from '@munyaal/calculations';
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
import { TypeInformativeReport } from '../../../common/enums/typeInformativeReport.enum';
import { MiniStoreSaleDetail } from './entities/mini-store-sale-detail.entity';
import { MiniStoreSalesDetailsService } from './mini-store-sales-details.service';
import { StoreProductsSoldReport } from './reports/products-sold.report';
import {
  QueryReportProductsSold,
  ReportProductsSoldRow,
} from './types/productsSoldQuery';

@Crud({
  model: {
    type: MiniStoreSaleDetail,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null,
      },
    },
    limit: 10,
    join: {
      miniStoreSale: { eager: false },
      miniStoreProduct: { eager: false },
      miniStoreClassification: { eager: false },
      extraCharges: { eager: false },
    },
  },
})
@Controller()
export class MiniStoreSalesDetailsController
  implements CrudController<MiniStoreSaleDetail> {
  constructor(readonly service: MiniStoreSalesDetailsService) {}

  get base(): CrudController<MiniStoreSaleDetail> {
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

  @Get('/top-trending-products-report')
  public topTrendingProducts(
    @Query()
    query?: {
      startDate: Date;
      endDate: Date;
      branchOfficeId: number;
      onlyData?: boolean;
    },
  ) {
    return this.service.topTrendingProductsReport(query);
  }

  @Get('report-products-sold')
  private async reportProductsSold(
    @Res() res,
    @Query() options: QueryReportProductsSold,
  ) {
    const result = await this.service.reportProductsSold(options);
    const data: ReportProductsSoldRow[] = [];
    result.forEach((r: ReportProductsSoldRow) => {
      let price = 0;
      if (r.product_IVA) {
        price = r.product_price_IVA;
      } else {
        price = r.product_price;
      }
      switch (parseInt(`${options.type}}`)) {
        case TypeInformativeReport.PRODUCTS:
          const indexProducts = data.findIndex(
            (d: ReportProductsSoldRow) => d.productsId == r.productsId,
          );
          if (indexProducts > -1) {
            data[indexProducts].vd_quantity = Decimal.sum(
              data[indexProducts].vd_quantity,
              r.vd_quantity,
            ).toNumber();
            data[indexProducts].product_price = Decimal.mul(
              data[indexProducts].vd_quantity,
              price,
            ).toNumber();
          } else {
            data.push(r);
          }
          break;
        case TypeInformativeReport.CATEGORIES:
          const indexCategories = data.findIndex(
            (d: ReportProductsSoldRow) => d.classificationsId == r.classificationsId,
          );
          if (indexCategories > -1) {
            data[indexCategories].vd_quantity = Decimal.sum(
              data[indexCategories].vd_quantity,
              r.vd_quantity,
            ).toNumber();
            const priceCategories = Decimal.mul(r.vd_quantity, price).toNumber();
            data[indexCategories].product_price = Decimal.sum(
              data[indexCategories].product_price,
              priceCategories,
            ).toNumber();
          } else {
            data.push({...r,product_price: Decimal.mul(r.vd_quantity, price).toNumber(),});
          }
          break;
        case TypeInformativeReport.CASHIERS:
          const indexCashiers = data.findIndex(
            (d: ReportProductsSoldRow) => d.cashier_id == r.cashier_id,
          );
          if (indexCashiers > -1) {
            data[indexCashiers].vd_quantity = Decimal.sum(
              data[indexCashiers].vd_quantity,
              r.vd_quantity,
            ).toNumber();
            const priceCashier = Decimal.mul(r.vd_quantity, price).toNumber();
            data[indexCashiers].product_price = Decimal.sum(
              data[indexCashiers].product_price,
              priceCashier,
            ).toNumber();
            } else {
            data.push({...r,product_price: Decimal.mul(r.vd_quantity, price).toNumber(),});
          }
          break;
      }
    });
    if (options?.isExported) {
      const conceptStatusExcel = new StoreProductsSoldReport(options, data);
      const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
        filename: `products_sold.xlsx`,
      });
      const report = {
        src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
          buffer,
        ).toString('base64')}`,
        type: 'excel',
        name: `products`,
      };
      return res.send({ report, data });
    } else {
      return res.send({ report: false, data });
    }
  }
}
