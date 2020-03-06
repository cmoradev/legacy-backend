import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Grade } from './entities/grade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class GradesService extends TypeOrmCrudService<Grade> {
    constructor(
        @InjectRepository(Grade, ColegioDBNameConnection) readonly repo: Repository<Grade>,
    ) {
        super(repo);
    }
}
