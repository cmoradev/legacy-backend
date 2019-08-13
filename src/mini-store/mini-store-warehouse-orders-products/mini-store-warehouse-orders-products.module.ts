import { Module } from '@nestjs/common';
import { MiniStoreWarehouseOrdersProductsController } from './mini-store-warehouse-orders-products.controller';
import { MiniStoreWarehouseOrdersProductsService } from './mini-store-warehouse-orders-products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreWarehouseOrderProduct } from './entities/mini-store-warehouse-order-product.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ MiniStoreWarehouseOrderProduct ], 'colegiodb') ],
  exports: [ MiniStoreWarehouseOrdersProductsService ],
  controllers: [MiniStoreWarehouseOrdersProductsController],
  providers: [MiniStoreWarehouseOrdersProductsService],
})
export class MiniStoreWarehouseOrdersProductsModule {}
