import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Incident } from './entities/incident.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IncidentsService extends TypeOrmCrudService<Incident> {
    constructor(
        @InjectRepository(Incident, 'colegiodb')
        readonly incidentRepository: Repository<Incident>,
    ) {
        super(incidentRepository);
    }
}
