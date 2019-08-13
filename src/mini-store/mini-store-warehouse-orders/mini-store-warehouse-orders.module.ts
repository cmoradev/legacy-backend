import { Module } from '@nestjs/common';
import { MiniStoreWarehouseOrdersController } from './mini-store-warehouse-orders.controller';
import { MiniStoreWarehouseOrdersService } from './mini-store-warehouse-orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreWarehouseOrder } from './entities/mini-store-warehouse-order.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([MiniStoreWarehouseOrder], 'colegiodb') ],
  exports: [ MiniStoreWarehouseOrdersService ],
  controllers: [MiniStoreWarehouseOrdersController],
  providers: [MiniStoreWarehouseOrdersService],
})
export class MiniStoreWarehouseOrdersModule {}
