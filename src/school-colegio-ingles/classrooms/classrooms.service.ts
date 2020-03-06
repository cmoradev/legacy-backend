import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Classroom } from './entities/classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class ClassroomsService extends TypeOrmCrudService<Classroom> {
    constructor(
        @InjectRepository(Classroom, ColegioDBNameConnection) readonly repo: Repository<Classroom>,
    ) {
        super(repo);
    }
}
