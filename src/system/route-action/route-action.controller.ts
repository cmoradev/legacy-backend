import {Controller, Delete, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { RouteAction } from './entities/route-action.entity';
import { RouteActionService } from './route-action.service';

@Crud({
    model: {
        type: RouteAction,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            actions: {eager: false},
        },
    },
})
@Controller()
export class RouteActionController implements CrudController<RouteAction> {
    constructor(
        readonly service: RouteActionService,
    ) {
    }

    get base(): CrudController<RouteAction> {
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
