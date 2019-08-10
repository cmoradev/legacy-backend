import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Student } from '../subjects/entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsService extends TypeOrmCrudService<Student> {
    constructor(
        @InjectRepository(Student, 'colegiodb') readonly repo: Repository<Student>,
    ) {
        super(repo);
    }

}
