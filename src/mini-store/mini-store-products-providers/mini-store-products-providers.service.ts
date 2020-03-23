import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreWarehouseOrder } from '../mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { MiniStoreProductsProviders } from './entities/mini-store-products-providers.entity';

@Injectable()
export class MiniStoreProductsProvidersService extends TypeOrmCrudService<MiniStoreProductsProviders> {
    constructor(
        @InjectRepository(MiniStoreProductsProviders, ColegioDBNameConnection) readonly repo: Repository<MiniStoreProductsProviders>,
    ) {
        super(repo);
    }
}
