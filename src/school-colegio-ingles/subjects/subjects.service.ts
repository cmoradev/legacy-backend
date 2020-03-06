import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class SubjectsService extends TypeOrmCrudService<Subject> {
    constructor(
        @InjectRepository(Subject, ColegioDBNameConnection) readonly repo: Repository<Subject>) {
        super(repo);
    }

}
