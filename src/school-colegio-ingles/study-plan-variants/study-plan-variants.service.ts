import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudyPlanVariant } from './entities/study-plan-variants.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class StudyPlanVariantsService extends TypeOrmCrudService<StudyPlanVariant> {
    constructor(
        @InjectRepository(StudyPlanVariant, ColegioDBNameConnection) readonly repo: Repository<StudyPlanVariant>,
    ) {
        super(repo);
    }

    async getVariantsWithPaymentPlan() {
        return await this.repo.createQueryBuilder('variant').innerJoinAndSelect('variant.studyPlan', 'studyPlan').getMany();
    }
}
