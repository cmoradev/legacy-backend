import { Controller, Delete, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreProduct } from './entities/mini-store-product.entity';
import { MiniStoreProductsService } from './mini-store-products.service';

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
        join: {
            storeClassification: {eager: false},
            storePriceList: {eager: false},
            storeInvoiceKey: {eager: false},
            miniStoreWarehouseOrdersProducts: {eager: false},
            miniStoreSaleDetails: {eager: false},
            miniStoreProductsProvider: {eager: false},
            'miniStoreProductsProvider.provider': {eager: false},
            branchOffice: {eager: false},
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
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
