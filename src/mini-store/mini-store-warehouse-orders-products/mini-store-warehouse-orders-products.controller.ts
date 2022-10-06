import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreWarehouseOrdersProductsService } from './mini-store-warehouse-orders-products.service';
import { MiniStoreWarehouseOrderProduct } from './entities/mini-store-warehouse-order-product.entity';

@Crud({
    model: {
        type: MiniStoreWarehouseOrderProduct,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            miniStoreProduct: {eager: false},
            'miniStoreProduct.storeInvoiceKey': {eager: false},
            'miniStoreProduct.storePriceList': {eager: false},
            'miniStoreProduct.storeClassification': {eager: false},
            miniStoreWarehouseOrder: {eager: false},
        },
    },
})
@Controller()
export class MiniStoreWarehouseOrdersProductsController implements CrudController<MiniStoreWarehouseOrderProduct> {
    constructor(
        readonly service: MiniStoreWarehouseOrdersProductsService,
    ) {
    }

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
