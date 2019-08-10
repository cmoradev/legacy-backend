import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class SubjectsService extends TypeOrmCrudService<Subject> {
    constructor(
        @InjectRepository(Subject, 'colegiodb') readonly repo: Repository<Subject>) {
        super(repo);
    }

}
