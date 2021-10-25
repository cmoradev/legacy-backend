import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
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
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            miniStoreWarehouseOrders: {},
        },
    },
})
@Controller()
export class MiniStoreWarehouseProvidersController implements CrudController<MiniStoreWarehouseProvider> {
    constructor(
        readonly service: MiniStoreWarehouseProvidersService,
    ) {
    }

    get base(): CrudController<MiniStoreWarehouseProvider> {
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
}
