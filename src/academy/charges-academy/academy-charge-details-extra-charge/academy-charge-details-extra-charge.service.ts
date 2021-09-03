import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeDetailsExtraCharge } from './entities/academy-charge-details-extra-charge.entity';

@Injectable()
export class AcademyChargeDetailsExtraChargeService extends TypeOrmCrudService<AcademyChargeDetailsExtraCharge> {
    constructor(
        @InjectRepository(AcademyChargeDetailsExtraCharge, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeDetailsExtraCharge>,
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
