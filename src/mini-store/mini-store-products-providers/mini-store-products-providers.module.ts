import { Module } from '@nestjs/common';
import { MiniStoreProductsProvidersService } from './mini-store-products-providers.service';
import { MiniStoreProductsProvidersController } from './mini-store-products-providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { MiniStoreProductsProviders } from './entities/mini-store-products-providers.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([MiniStoreProductsProviders], ColegioDBNameConnection),
    ],
    exports: [MiniStoreProductsProvidersService],
    providers: [MiniStoreProductsProvidersService],
    controllers: [MiniStoreProductsProvidersController],
})
export class MiniStoreProductsProvidersModule {
}
