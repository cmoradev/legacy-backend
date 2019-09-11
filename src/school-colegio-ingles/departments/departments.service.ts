import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService extends TypeOrmCrudService<Department> {
    constructor(
        @InjectRepository(Department, 'colegiodb')
        readonly departmentRepo: Repository<Department>,
    ) {
        super(departmentRepo);
    }
}
