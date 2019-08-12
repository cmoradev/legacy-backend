import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AssignmentSubject } from './entities/assignment-subject.entity';
import { AssignmentsSubjectsService } from './assignments-subjects.service';

@Crud({
    model: {
        type: AssignmentSubject,
    },
})
@Controller('assignments-subjects')
export class AssignmentsSubjectsController implements CrudController<AssignmentSubject> {
    constructor(
       readonly service: AssignmentsSubjectsService,
    ) { }
    get base(): CrudController<AssignmentSubject> {
        return this;
    }
}
