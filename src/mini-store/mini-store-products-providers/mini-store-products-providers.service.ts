import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { MiniStoreProductsProviders } from './entities/mini-store-products-providers.entity';

@Injectable()
export class MiniStoreProductsProvidersService extends TypeOrmCrudService<MiniStoreProductsProviders> {
    constructor(
        @InjectRepository(MiniStoreProductsProviders, ColegioDBNameConnection) readonly repo: Repository<MiniStoreProductsProviders>,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({ id }, {withDeleted: true});
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.restore(id);
    }
}
