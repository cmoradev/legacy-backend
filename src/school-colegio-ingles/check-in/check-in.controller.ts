import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CheckIn } from './entities/check-in.entity';
import { CheckInService } from './check-in.service';

@Crud({
    model: {
        type: CheckIn,
    },
    query: {
        join: {
            department: {},
        },
    },
})
@Controller()
export class CheckInController implements CrudController<CheckIn> {
    constructor(readonly service: CheckInService) {}
    get base(): CrudController<CheckIn> {
        return this;
    }
}
