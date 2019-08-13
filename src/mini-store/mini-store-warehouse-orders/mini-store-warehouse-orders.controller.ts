import { Controller } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { MiniStoreWarehouseOrder } from './entities/mini-store-warehouse-order.entity';
import { MiniStoreWarehouseOrdersService } from './mini-store-warehouse-orders.service';

@Crud({
    model: {
        type: MiniStoreWarehouseOrder,
    },
    query: {
        join: {
            miniStoreWareHouseOrdersProducts: {},
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
}
