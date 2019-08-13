import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreWarehouseOrderProduct } from './entities/mini-store-warehouse-order-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MiniStoreWarehouseOrdersProductsService extends TypeOrmCrudService<MiniStoreWarehouseOrderProduct> {
    constructor(
        @InjectRepository(MiniStoreWarehouseOrderProduct, 'colegiodb') readonly repo: Repository<MiniStoreWarehouseOrderProduct>,
    ) { super(repo); }
}
