import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudyPlanVariant } from './entities/study-plan-variants.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class StudyPlanVariantsService extends TypeOrmCrudService<StudyPlanVariant> {
    constructor(
        @InjectRepository(StudyPlanVariant, ColegioDBNameConnection) readonly repo: Repository<StudyPlanVariant>,
    ) {
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

    async getVariantsWithPaymentPlan() {
        return await this.repo.createQueryBuilder('variant').innerJoinAndSelect('variant.studyPlan', 'studyPlan').getMany();
    }
}
