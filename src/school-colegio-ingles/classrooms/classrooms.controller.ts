import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Classroom } from './entities/classroom.entity';
import { ClassroomsService } from './classrooms.service';

@Crud({
    model: {
        type: Classroom,
    },
})
@Controller()
export class ClassroomsController implements CrudController<Classroom> {
    constructor(readonly service: ClassroomsService) { }
    get base(): CrudController<Classroom> {
        return this;
    }
}
