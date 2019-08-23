/* tslint:disable:object-literal-key-quotes */
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Assignment } from './entities/assignment.entity';
import { AssignmentsService } from './assignments.service';

@Crud({
    model: {
        type: Assignment,
    },
    query: {
        join: {
            cycle: {},
            studyPlanVariant: {},
            studyPlan: {},
            teacher: {},
            classroom: {},
            assignmentSubject: {},
            'assignmentSubject.subject': {},
        },
    },
})
@Controller()
export class AssignmentsController implements CrudController<Assignment> {
    constructor(
        readonly service: AssignmentsService,
    ) {
    }

    get base(): CrudController<Assignment> {
        return this;
    }
}
