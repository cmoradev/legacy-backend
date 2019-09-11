import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Department } from './entities/department.entity';
import { DepartmentsService } from './departments.service';

@Crud({
    model: {
        type: Department,
    },
})
@Controller()
export class DepartmentsController implements CrudController<Department> {
    constructor(readonly service: DepartmentsService) {

    }
    get base(): CrudController<Department> {
        return this;
    }
}
