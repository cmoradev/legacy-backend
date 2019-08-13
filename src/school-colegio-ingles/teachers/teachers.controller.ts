import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Teacher } from './entities/teacher.entity';
import { TeachersService } from './teachers.service';

@Crud({
    model: {
        type: Teacher,
    },
})
@Controller()
export class TeachersController implements CrudController<Teacher> {
    constructor(
        readonly service: TeachersService,
    ) { }
    get base(): CrudController<Teacher> {
        return this;
    }
}
