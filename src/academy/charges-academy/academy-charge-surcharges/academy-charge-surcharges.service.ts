import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeSurcharges } from './entities/academy-charge-surcharges.entity';

@Injectable()
export class AcademyChargeSurchargesService extends TypeOrmCrudService<AcademyChargeSurcharges> {
    constructor(
        @InjectRepository(AcademyChargeSurcharges, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeSurcharges>,
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
