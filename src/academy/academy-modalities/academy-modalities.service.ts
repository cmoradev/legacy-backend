import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AcademiesModality } from './entities/academy-modality.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class AcademyModalitiesService extends TypeOrmCrudService<AcademiesModality> {
    constructor(
        @InjectRepository(AcademiesModality, ColegioDBNameConnection) readonly repo: Repository<AcademiesModality>,
    ) {
        super(repo);
    }
}
