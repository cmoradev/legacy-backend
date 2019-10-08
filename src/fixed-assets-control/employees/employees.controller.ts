import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Employee } from './entities/employee.entity';
import { EmployeesService } from './employees.service';

@Crud({
    model: {
        type: Employee,
    },
    query: {
        join: {
            branchCompanies: {},
            jobPositions: {},
            assignments: {},
        },
    },
})
@Controller()
export class EmployeesController implements CrudController<Employee> {
    constructor(public service: EmployeesService) {
    }
}
