import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudyPlanVariant } from './entities/study-plan-variants.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class StudyPlanVariantsService extends TypeOrmCrudService<StudyPlanVariant> {
    constructor(
        @InjectRepository(StudyPlanVariant, 'colegiodb') readonly repo: Repository<StudyPlanVariant>,
    ) {
        super(repo);
    }
}
