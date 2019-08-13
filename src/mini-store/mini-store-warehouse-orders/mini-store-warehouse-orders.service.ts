import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreWarehouseOrder } from './entities/mini-store-warehouse-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MiniStoreWarehouseOrdersService extends TypeOrmCrudService<MiniStoreWarehouseOrder> {
    constructor(
        @InjectRepository(MiniStoreWarehouseOrder, 'colegiodb') readonly repo: Repository<MiniStoreWarehouseOrder>,
    ) {
        super(repo);
    }
}
