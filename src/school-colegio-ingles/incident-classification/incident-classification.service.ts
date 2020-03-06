import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IncidentClassification } from './entities/incident-classification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class IncidentClassificationService extends TypeOrmCrudService<IncidentClassification> {
    constructor(
        @InjectRepository(IncidentClassification, ColegioDBNameConnection)
        readonly incidentClassificationRepository: Repository<IncidentClassification>,
    ) {
        super(incidentClassificationRepository);
    }
}
