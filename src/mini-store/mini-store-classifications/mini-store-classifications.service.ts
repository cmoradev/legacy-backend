import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MiniStoreClassification } from './entities/mini-store-classification.entity';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Like } from 'typeorm';

@Injectable()
export class MiniStoreClassificationsService extends TypeOrmCrudService<MiniStoreClassification> {
    constructor(
        @InjectRepository(MiniStoreClassification, ColegioDBNameConnection) readonly repo: Repository<MiniStoreClassification>,
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

    async getClasificationLike(name: string, returnId?: boolean) {
        if (returnId) {
            const query = await this.repo.findOne({ name: Like(`%${name}%`) });
            return query.id;
        } else {
            return await this.repo.findOne({ name: Like(`%${name}%`) });
        }
    }
}
