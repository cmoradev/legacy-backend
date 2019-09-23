import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';

@Crud({
    model: {
        type: Student,
    },
    query: {
        join: {
            family: {},
            academiesModality: {},
            campus: {},
            incidents: {},
            'incidents.teacher': { },
            'incidents.classroom': { },
            'incidents.incidentClassification': { },
            inscriptions: {},
            'inscriptions.cycle': { },
            'inscriptions.classroom': {},
            'inscriptions.level': {},
            'inscriptions.grade': {},
        },
    },
})
@Controller()
export class StudentsController implements CrudController<Student> {
    constructor(
        readonly service: StudentsService,
    ) {
    }

    get base(): CrudController<Student> {
        return this;
    }
}
