import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreWarehouseOrderProduct } from './entities/mini-store-warehouse-order-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class MiniStoreWarehouseOrdersProductsService extends TypeOrmCrudService<MiniStoreWarehouseOrderProduct> {
    constructor(
        @InjectRepository(MiniStoreWarehouseOrderProduct, ColegioDBNameConnection) readonly repo: Repository<MiniStoreWarehouseOrderProduct>,
    ) { super(repo); }
}
