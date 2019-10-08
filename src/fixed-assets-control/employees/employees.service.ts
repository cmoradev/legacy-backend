import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class EmployeesService extends TypeOrmCrudService<Employee> {
    constructor(@InjectRepository(Employee, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
