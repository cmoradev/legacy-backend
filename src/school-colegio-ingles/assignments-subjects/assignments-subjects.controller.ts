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
            studyPlanVariant: { eager: true, allow: ['name', 'code'] },
            subject: {
                eager: true, allow: ['name', 'shortName', 'code'],
            },
            grade: { eager: true },
            assignment: {},
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
