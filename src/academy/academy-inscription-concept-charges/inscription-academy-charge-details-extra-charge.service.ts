import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyInscriptionConceptCharges } from './entites/academy-inscription-concept-charges.entity';

@Injectable()
export class IncriptionAcademyChargeDetailsExtraChargeService extends TypeOrmCrudService<AcademyInscriptionConceptCharges> {
    constructor(
        @InjectRepository(AcademyInscriptionConceptCharges, ColegioDBNameConnection) readonly repo: Repository<AcademyInscriptionConceptCharges>,
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
}
