import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IncidentClassification } from './entities/incident-classification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IncidentClassificationService extends TypeOrmCrudService<IncidentClassification> {
    constructor(
        @InjectRepository(IncidentClassification, 'colegiodb')
        readonly incidentClassificationRepository: Repository<IncidentClassification>,
    ) {
        super(incidentClassificationRepository);
    }
}
