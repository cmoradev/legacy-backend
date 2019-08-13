import { Controller } from '@nestjs/common';
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
}
