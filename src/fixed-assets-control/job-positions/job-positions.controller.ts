import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { JobPosition } from './entities/job-position.entity';
import { JobPositionsService } from './job-positions.service';

@Crud({
    model: {
        type: JobPosition,
    },
    query: {
        limit: 10,
        join: {
            department: {eager: false},
            'department.locations': {eager: false},
        },
    },
})
@Controller()
export class JobPositionsController implements CrudController<JobPosition> {
    constructor(public service: JobPositionsService) {
    }
}
