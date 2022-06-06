import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { MiniStorePricesListsService } from './mini-store-prices-lists.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStorePriceList } from './entities/mini-store-price-list.entity';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@Crud({
    model: {
        type: MiniStorePriceList,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            storeProducts: {},
            branchOfficeList: {},
        },
    },
})
@Controller()
export class MiniStorePricesListsController implements CrudController<MiniStorePriceList> {
    constructor(
        readonly service: MiniStorePricesListsService,
    ) {
    }

    get base(): CrudController<MiniStorePriceList> {
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
