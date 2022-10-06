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
        limit: 10,
        join: {
            cycle: {eager: false},
            studyPlanVariant: {eager: false},
            studyPlan: {eager: false},
            teacher: {eager: false},
            classroom: {eager: false},
            assignmentSubject: {eager: false},
            'assignmentSubject.subject': {eager: false},
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
