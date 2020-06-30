import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSaleDetail } from './entities/mini-store-sale-detail.entity';
import { MiniStoreSalesDetailsService } from './mini-store-sales-details.service';
import { DataConverter } from '../../../common/office/excel-tools/data-converter';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStoreSaleDetail,
    },
    query: {
        join: {
            miniStoreSale: {},
            miniStoreProduct: {},
            miniStoreClassification: {},
            extraCharges: {},
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
    public topTrendingProducts(@Query() query?: {
        startDate: Date,
        endDate: Date;
        branchOfficeId: number;
        onlyData?: boolean
    }) {
        return this.service.topTrendingProductsReport(query);
    }
}
