import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreWarehouseOrder } from './entities/mini-store-warehouse-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class MiniStoreWarehouseOrdersService extends TypeOrmCrudService<MiniStoreWarehouseOrder> {
    constructor(
        @InjectRepository(MiniStoreWarehouseOrder, ColegioDBNameConnection) readonly repo: Repository<MiniStoreWarehouseOrder>,
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

    async getOrdersWeareHouse(id: number) {
        return await this.repo.findOne(id,
            {
                relations: [
                    'miniStoreWareHouseOrdersProducts',
                    'agentCreator',
                    'miniStoreWareHouseOrdersProducts.miniStoreProduct',
                    'miniStoreWarehouseProvider',
                ],
            });
    }

}
