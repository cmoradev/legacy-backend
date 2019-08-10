import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Student } from '../subjects/entities/student.entity';
import { StudentsService } from './students.service';

@Crud({
    model: {
        type: Student,
    },
})
@Controller()
export class StudentsController implements CrudController<Student> {
    constructor(
        readonly service: StudentsService,
    ) {  }
    get base(): CrudController<Student> {
        return this;
    }
}
