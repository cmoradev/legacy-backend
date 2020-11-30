import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Crud, CrudController } from '@nestjsx/crud';
import { RouteAction } from './entities/route-action.entity';
import { RouteActionService } from './route-action.service';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: RouteAction,
    },
    query: {
        join: {
            actions: {},
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
}
