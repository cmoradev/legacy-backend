import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { CrudController, Crud } from '@nestjsx/crud';
import { MiniStoreWarehouseOrder } from './entities/mini-store-warehouse-order.entity';
import { MiniStoreWarehouseOrdersService } from './mini-store-warehouse-orders.service';
import { orderRecipe } from './reports/ordersRecipe';

@Crud({
    model: {
        type: MiniStoreWarehouseOrder,
    },
    query: {
        join: {
            miniStoreWareHouseOrdersProducts: {},
            'miniStoreWareHouseOrdersProducts.miniStoreProduct': {},
            miniStoreWarehouseProvider: {},
        },
    },
})
@Controller()
export class MiniStoreWarehouseOrdersController implements CrudController<MiniStoreWarehouseOrder> {
    constructor(
        readonly service: MiniStoreWarehouseOrdersService,
    ) {
    }

    get base(): CrudController<MiniStoreWarehouseOrder> {
        return this;
    }

    @Get('pdf')
    public async pdf(@Res() res: Response) {
        res.contentType('application/pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.end(await orderRecipe(), 'binary');
        // res.setHeader('Content-Disposition', 'attachment; filename="' + encodeURIComponent(pdfBuffer.toString()) + '"');
    }
}
