import { Controller, Get, Query } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreProduct } from './entities/mini-store-product.entity';
import { MiniStoreProductsService } from './mini-store-products.service';

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
            BranchOffice: {alias: 'branchId'}
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
}
