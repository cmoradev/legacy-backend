import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStorePriceList } from './entities/mini-store-price-list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Like } from 'typeorm';

@Injectable()
export class MiniStorePricesListsService extends TypeOrmCrudService<MiniStorePriceList> {
    constructor(
        @InjectRepository(MiniStorePriceList, ColegioDBNameConnection) readonly repo: Repository<MiniStorePriceList>,
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

    public async getListLike(name: string, returnId?: boolean) {
        if (returnId) {
            const query = await this.repo.findOne({ name: Like(`%${name}%`) });
            return query.id;
        } else {
            return await this.repo.findOne({ name: Like(`%${name}%`) });
        }
    }
}
