import { Module } from '@nestjs/common';
import { MiniStoreProductsController } from './mini-store-products.controller';
import { MiniStoreProductsService } from './mini-store-products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreProduct } from './entities/mini-store-product.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ MiniStoreProduct ] , 'colegiodb')],
  exports: [ MiniStoreProductsService ],
  controllers: [MiniStoreProductsController],
  providers: [MiniStoreProductsService],
})
export class MiniStoreProductsModule {}
