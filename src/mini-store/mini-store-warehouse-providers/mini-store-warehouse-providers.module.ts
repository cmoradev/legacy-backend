import { Module } from '@nestjs/common';
import { MiniStoreWarehouseProvidersController } from './mini-store-warehouse-providers.controller';
import { MiniStoreWarehouseProvidersService } from './mini-store-warehouse-providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreWarehouseProvider } from './entities/mini-store-warehouse-provider.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([MiniStoreWarehouseProvider], ColegioDBNameConnection)],
    exports: [MiniStoreWarehouseProvidersService],
    controllers: [MiniStoreWarehouseProvidersController],
    providers: [MiniStoreWarehouseProvidersService],
})
export class MiniStoreWarehouseProvidersModule {
}
