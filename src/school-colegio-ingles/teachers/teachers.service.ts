import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService extends TypeOrmCrudService<Teacher> {
    constructor(
        @InjectRepository(Teacher, 'colegiodb') repo: Repository<Teacher>,
    ) { super(repo); }
}
