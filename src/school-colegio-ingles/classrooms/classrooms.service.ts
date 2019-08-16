import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Classroom } from './entities/classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomsService extends TypeOrmCrudService<Classroom> {
    constructor(
        @InjectRepository(Classroom, 'colegiodb') readonly repo: Repository<Classroom>,
    ) {
        super(repo);
    }
}
