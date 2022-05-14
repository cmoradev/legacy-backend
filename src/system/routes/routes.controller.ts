import { Controller, Get, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Route } from './entities/route.entity';
import { RoutesService } from './routes.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Crud({
    model: {
        type: Route,
    },
    query: {
        join: {
            routeActions: {},
            'routeActions.route': {},
            'routeActions.action': {},
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

    @Get('roots')
    async getRoots() {
        return await this.service.getRoots();
    }
}
