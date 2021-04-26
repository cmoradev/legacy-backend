import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { StudyPlan } from './entities/study-plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class StudyPlansService extends TypeOrmCrudService<StudyPlan> {
    constructor(
        @InjectRepository(StudyPlan, ColegioDBNameConnection) readonly repo: Repository<StudyPlan>) {
        super(repo);
    }

    async getStudyPlansWithLevel() {
        return await this.repo.createQueryBuilder('studyPlan').innerJoinAndSelect('studyPlan.level', 'level').getMany();
    }
}
