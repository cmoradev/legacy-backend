import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyCharge } from './entities/academy-charge.entity';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';

@Injectable()
export class AcademyChargeService extends TypeOrmCrudService<AcademyCharge> {
    constructor(
        @InjectRepository(AcademyCharge, ColegioDBNameConnection) readonly repo: Repository<AcademyCharge>,
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
