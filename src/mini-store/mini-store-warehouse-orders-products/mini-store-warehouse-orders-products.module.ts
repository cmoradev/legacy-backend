import { Module } from '@nestjs/common';
import { MiniStoreWarehouseOrdersProductsController } from './mini-store-warehouse-orders-products.controller';
import { MiniStoreWarehouseOrdersProductsService } from './mini-store-warehouse-orders-products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreWarehouseOrderProduct } from './entities/mini-store-warehouse-order-product.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ MiniStoreWarehouseOrderProduct ], ColegioDBNameConnection) ],
  exports: [ MiniStoreWarehouseOrdersProductsService ],
  controllers: [MiniStoreWarehouseOrdersProductsController],
  providers: [MiniStoreWarehouseOrdersProductsService],
})
export class MiniStoreWarehouseOrdersProductsModule {}
