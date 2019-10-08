import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { JobPosition } from './entities/job-position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class JobPositionsService extends TypeOrmCrudService<JobPosition> {
    constructor(@InjectRepository(JobPosition, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
