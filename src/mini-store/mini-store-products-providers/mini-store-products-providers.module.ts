import { Module } from '@nestjs/common';
import { MiniStoreProductsProvidersService } from './mini-store-products-providers.service';
import { MiniStoreProductsProvidersController } from './mini-store-products-providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { MiniStoreProductsProviders } from './entities/mini-store-products-providers.entity';
import { MiniStoreProductsModule } from '../mini-store-products/mini-store-products.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([MiniStoreProductsProviders], ColegioDBNameConnection),
        MiniStoreProductsModule,
    ],
    exports: [MiniStoreProductsProvidersService],
    providers: [MiniStoreProductsProvidersService],
    controllers: [MiniStoreProductsProvidersController],
})
export class MiniStoreProductsProvidersModule {
}
