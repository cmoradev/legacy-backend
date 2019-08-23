import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Classroom } from './entities/classroom.entity';
import { ClassroomsService } from './classrooms.service';

@Crud({
    model: {
        type: Classroom,
    },
    query: {
        join: {
            grade: {  },
            cycle: {  },
            studyPlan: {  },
            studyPlanVariant: {  },
            group: {  },
            level: {  },
            assignments: {  },
            inscriptions: { },
        },
    },
})
@Controller()
export class ClassroomsController implements CrudController<Classroom> {
    constructor(readonly service: ClassroomsService) { }
    get base(): CrudController<Classroom> {
        return this;
    }
}
