import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreWarehouseProvider } from './entities/mini-store-warehouse-provider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MiniStoreWarehouseProvidersService extends TypeOrmCrudService<MiniStoreWarehouseProvider> {
    constructor(
        @InjectRepository(MiniStoreWarehouseProvider, 'colegiodb') readonly repo: Repository<MiniStoreWarehouseProvider>,
    ) {
        super(repo);
    }
}
