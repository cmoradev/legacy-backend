import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class TeachersService extends TypeOrmCrudService<Teacher> {
    constructor(
        @InjectRepository(Teacher, ColegioDBNameConnection) repo: Repository<Teacher>,
    ) { super(repo); }
}
