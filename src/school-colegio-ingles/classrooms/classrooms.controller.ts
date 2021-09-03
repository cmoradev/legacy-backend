import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Classroom } from './entities/classroom.entity';
import { ClassroomsService } from './classrooms.service';

@Crud({
    model: {
        type: Classroom,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            grade: {},
            'grade.level': {
                alias: 'grade_level',
            },
            'grade.level.campus': {
                alias: 'grade_level_campus',
            },
            cycle: {},
            studyPlan: {},
            studyPlanVariant: {},
            group: {},
            level: {},
            'level.campus': {},
            assignments: {},
            inscriptions: {},
            'inscriptions.student': {},
            'inscriptions.student.family': {},
            'inscriptions.student.incidents': {},
        },
    },
})
@Controller()
export class ClassroomsController implements CrudController<Classroom> {
    constructor(readonly service: ClassroomsService) {
    }

    get base(): CrudController<Classroom> {
        return this;
    }
}
