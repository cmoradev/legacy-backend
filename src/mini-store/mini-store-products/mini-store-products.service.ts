import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MiniStoreProduct } from './entities/mini-store-product.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class MiniStoreProductsService extends TypeOrmCrudService<MiniStoreProduct> {
    constructor(
        @InjectRepository(MiniStoreProduct, 'colegiodb') readonly repo: Repository<MiniStoreProduct>,
    ) { super(repo); }
}
