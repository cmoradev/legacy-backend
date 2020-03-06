import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class StudentsService extends TypeOrmCrudService<Student> {
    constructor(
        @InjectRepository(Student, ColegioDBNameConnection) readonly repo: Repository<Student>,
    ) {
        super(repo);
    }

}
