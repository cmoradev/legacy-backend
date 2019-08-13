import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AcademiesModality } from './entities/academies-modality.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AcademiesModalitiesService extends TypeOrmCrudService<AcademiesModality> {
    constructor(
        @InjectRepository(AcademiesModality, 'colegiodb') readonly repo: Repository<AcademiesModality>,
    ) {
        super(repo);
    }
}
