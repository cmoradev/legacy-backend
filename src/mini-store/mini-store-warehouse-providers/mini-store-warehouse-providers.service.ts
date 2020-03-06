import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreWarehouseProvider } from './entities/mini-store-warehouse-provider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class MiniStoreWarehouseProvidersService extends TypeOrmCrudService<MiniStoreWarehouseProvider> {
    constructor(
        @InjectRepository(MiniStoreWarehouseProvider, ColegioDBNameConnection) readonly repo: Repository<MiniStoreWarehouseProvider>,
    ) {
        super(repo);
    }
}
