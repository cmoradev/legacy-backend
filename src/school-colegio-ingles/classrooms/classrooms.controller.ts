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
            grade: {eager: false},
             'grade.level': {
                alias: 'grade_level',
                 eager: false
            },
            'grade.level.campus': {
                alias: 'grade_level_campus',
                eager: false
            },
            cycle: {eager: false},
            studyPlan: {eager: false},
            studyPlanVariant: {eager: false},
            group: {eager: false},
            level: {eager: false},
            'level.campus': {eager: false},
            assignments: {eager: false},
            inscriptions: {eager: false},
            'inscriptions.student': {eager: false},
            'inscriptions.student.family': {eager: false},
            'inscriptions.student.incidents': {eager: false},
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
