import { Module } from '@nestjs/common';
import { MiniStoreProductsController } from './mini-store-products.controller';
import { MiniStoreProductsService } from './mini-store-products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreProduct } from './entities/mini-store-product.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([MiniStoreProduct], ColegioDBNameConnection)],
    exports: [MiniStoreProductsService],
    controllers: [MiniStoreProductsController],
    providers: [MiniStoreProductsService],
})
export class MiniStoreProductsModule {
}
