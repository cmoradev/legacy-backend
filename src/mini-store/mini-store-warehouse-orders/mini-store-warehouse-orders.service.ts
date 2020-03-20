import { Injectable } from '@nestjs/common';
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
