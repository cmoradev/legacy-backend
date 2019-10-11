import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Classification } from './entities/classification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class ClassificationsService extends TypeOrmCrudService<Classification> {
    constructor(@InjectRepository(Classification, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
