import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Incident } from './entities/incident.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class IncidentsService extends TypeOrmCrudService<Incident> {
    constructor(
        @InjectRepository(Incident, ColegioDBNameConnection)
        readonly incidentRepository: Repository<Incident>,
    ) {
        super(incidentRepository);
    }
}
