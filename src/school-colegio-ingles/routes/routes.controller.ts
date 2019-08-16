import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Route } from './entities/route.entity';
import { RoutesService } from './routes.service';

@Crud({
    model: {
        type: Route,
    },
})
@Controller()
export class RoutesController implements CrudController<Route> {
    constructor(
        readonly service: RoutesService,
    ) {}
    get base(): CrudController<Route> {
        return this;
    }
}
