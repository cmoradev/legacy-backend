import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreWarehouseOrdersProductsService } from './mini-store-warehouse-orders-products.service';
import { MiniStoreWarehouseOrderProduct } from './entities/mini-store-warehouse-order-product.entity';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
