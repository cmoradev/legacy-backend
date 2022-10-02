import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AssignmentSubject } from './entities/assignment-subject.entity';
import { AssignmentsSubjectsService } from './assignments-subjects.service';

@Crud({
    model: {
        type: AssignmentSubject,
    },
    query: {
        join: {
            studyPlanVariant: { eager: false, allow: ['name', 'code'] },
            subject: {
                eager: false, allow: ['name', 'shortName', 'code'],
            },
            grade: { eager: false },
            assignment: {eager: false},
        },
    },
})
@Controller()
export class AssignmentsSubjectsController implements CrudController<AssignmentSubject> {
    constructor(
        readonly service: AssignmentsSubjectsService,
    ) {
    }

    get base(): CrudController<AssignmentSubject> {
        return this;
    }
}
