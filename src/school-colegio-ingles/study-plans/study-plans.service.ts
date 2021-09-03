import { Injectable, NotFoundException } from '@nestjs/common';
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

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({ id }, { withDeleted: true });
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.restore(id);
    }

    async getStudyPlansWithLevel() {
        return await this.repo.createQueryBuilder('studyPlan').innerJoinAndSelect('studyPlan.level', 'level').getMany();
    }
}
