import { Crud, CrudController } from '@nestjsx/crud';
import { Controller, UseGuards, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
import { MiniStorePrices } from './entities/mini-store-prices.entity';
import { MiniStorePricesService } from './mini-store-prices.service';

@Crud({
    model: {
        type: MiniStorePrices,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {},
    },
})
@Controller()
export class MiniStorePricesController implements CrudController<MiniStorePrices> {

    constructor(
        readonly service: MiniStorePricesService
    ) { }

    get base(): CrudController<MiniStorePrices> {
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