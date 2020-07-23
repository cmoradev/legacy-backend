import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreWarehouseOrdersProductsService } from './mini-store-warehouse-orders-products.service';
import { MiniStoreWarehouseOrderProduct } from './entities/mini-store-warehouse-order-product.entity';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStoreWarehouseOrderProduct,
    },
    query: {
        join: {
            miniStoreProduct: {},
            'miniStoreProduct.storeInvoiceKey': {},
            'miniStoreProduct.storePriceList': {},
            'miniStoreProduct.storeClassification': {},
            miniStoreWarehouseOrder: {},
        },
    },
})
@Controller()
export class MiniStoreWarehouseOrdersProductsController implements CrudController<MiniStoreWarehouseOrderProduct> {
    constructor(
        readonly service: MiniStoreWarehouseOrdersProductsService,
    ) {
    }
}
