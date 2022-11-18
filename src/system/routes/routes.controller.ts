import {Controller, Delete, Get, Param, ParseIntPipe, Put, Query, Res} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { IQueryRoutesChildDto, IQueryRoutesFatherDto } from './dto/query-routes.dto';
import { Route } from './entities/route.entity';
import { RoutesService } from './routes.service';

@Crud({
    model: {
        type: Route,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            routeActions: { eager: false },
            'routeActions.route': { eager: false },
            'routeActions.action': { eager: false },
        },
    },
})
@Controller()
export class RoutesController implements CrudController<Route> {
    constructor(
        readonly service: RoutesService,
    ) {
    }

    get base(): CrudController<Route> {
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

    @Get('roots')
    async getRoots() {
        return await this.service.getRoots();
    }

    @Get('fathers')
    async getFathers(
        @Query() options: IQueryRoutesFatherDto
    ) {
        const result = await this.service.getFathers(options)
        const data = result.data.map((d: any) => {
            let childs = [];

            d.childs != null ? childs = d.childs.split(",") : null;
            return { ...d, childs: childs.map((p: string) => { return parseInt(`${p}`) }) }
        });
        return { ...result, data };
    }

    @Get('childs')
    async getChilds(
        @Query() options: IQueryRoutesChildDto,
    ) {
        const result = await this.service.getChilds(options)
        const data = result.data.map((d: any) => {
            let childs = [];

            d.childs != null ? childs = d.childs.split(",") : null;
            return { ...d ,childs: childs.map((p: string) => { return parseInt(`${p}`) }) }
        });
        return { ...result, data };
    }
}
