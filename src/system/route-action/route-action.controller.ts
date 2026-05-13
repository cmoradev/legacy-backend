import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { RouteAction } from './entities/route-action.entity';
import { RouteActionService } from './route-action.service';

@Crud({
  model: {
    type: RouteAction,
  },
  query: {
    join: {
      route: { eager: false },
      action: { eager: false },
    },
  },
})
@Controller()
export class RouteActionController implements CrudController<RouteAction> {
  constructor(readonly service: RouteActionService) {}

  get base(): CrudController<RouteAction> {
    return this;
  }
}
