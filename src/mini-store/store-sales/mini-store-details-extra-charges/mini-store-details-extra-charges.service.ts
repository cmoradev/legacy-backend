import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MiniStoreDetailsExtraCharges } from './entities/mini-store-details-extra-charges.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';

@Injectable()
export class MiniStoreDetailsExtraChargesService extends TypeOrmCrudService<MiniStoreDetailsExtraCharges> {
    constructor(
        @InjectRepository(MiniStoreDetailsExtraCharges, ColegioDBNameConnection) readonly repo: Repository<MiniStoreDetailsExtraCharges>,
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
