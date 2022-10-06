import { Controller, Delete, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSaleDetail } from './entities/mini-store-sale-detail.entity';
import { MiniStoreSalesDetailsService } from './mini-store-sales-details.service';

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
            miniStoreSale: {eager: false},
            miniStoreProduct: {eager: false},
            miniStoreClassification: {eager: false},
            extraCharges: {eager: false},
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
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
