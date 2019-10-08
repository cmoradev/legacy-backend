import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { JobPosition } from './entities/job-position.entity';
import { JobPositionsService } from './job-positions.service';

@Crud({
    model: {
        type: JobPosition,
    },
})
@Controller()
export class JobPositionsController implements CrudController<JobPosition> {
    constructor(public service: JobPositionsService) {
    }
}
