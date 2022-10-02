import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Periods } from './entities/periods.entity';
import { PeriodsService } from './periods.service';

@Crud({
    model: {
        type: Periods,
    },
    query: {
        limit: 10,
        join: {
            periodsCycle: {eager: false},
        },
    },
})
@Controller()
export class PeriodsController implements CrudController<Periods> {
    constructor(readonly service: PeriodsService) {
    }

    get base(): CrudController<Periods> {
        return this;
    }
}
