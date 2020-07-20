import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreWarehouseProvider } from './entities/mini-store-warehouse-provider.entity';
import { MiniStoreWarehouseProvidersService } from './mini-store-warehouse-providers.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStoreWarehouseProvider,
    },
    query: {
        join: {
            miniStoreWarehouseOrders: {},
        },
    },
})
@Controller()
export class MiniStoreWarehouseProvidersController implements CrudController<MiniStoreWarehouseProvider> {
    constructor(
        readonly service: MiniStoreWarehouseProvidersService,
    ) {}
    get base(): CrudController<MiniStoreWarehouseProvider> {
        return this;
    }
}
