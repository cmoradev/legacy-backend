import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Periods } from './entities/periods.entity';
import { PeriodsService } from './periods.service';
import { Student } from '../students/entities/student.entity';

@Crud({
    model: {
        type: Periods,
    },
    query: {
        limit: 200,
        join: {
            periodsCycle: {},
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
