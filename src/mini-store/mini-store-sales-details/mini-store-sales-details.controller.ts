import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSaleDetail } from './entities/mini-store-sale-detail.entity';
import { MiniStoreSalesDetailsService } from './mini-store-sales-details.service';
import { DataConverter } from '../../common/excel-tools/data-converter';

@Crud({
    model: {
        type: MiniStoreSaleDetail,
    },
    query: {
        join: {
            miniStoreSale: {},
            miniStoreProduct: {},
            miniStoreClassification: {},
        },
    },
})
@Controller()
export class MiniStoreSalesDetailsController implements CrudController<MiniStoreSaleDetail> {
    constructor(readonly service: MiniStoreSalesDetailsService) {
    }

    get base(): CrudController<MiniStoreSaleDetail> {
        return this;
    }

    @Get('/top-trending-products-report')
    public topTrendingProducts(query?: { startDate: Date, endDate: Date }) {
        return this.service.topTrendingProductsReport(query);
    }
}
