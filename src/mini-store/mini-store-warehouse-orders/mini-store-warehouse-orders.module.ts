import { Module } from '@nestjs/common';
import { MiniStoreWarehouseOrdersController } from './mini-store-warehouse-orders.controller';
import { MiniStoreWarehouseOrdersService } from './mini-store-warehouse-orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreWarehouseOrder } from './entities/mini-store-warehouse-order.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { InvoiceCompanyModule } from '../../invoice/invoice-company/invoice-company.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([MiniStoreWarehouseOrder], ColegioDBNameConnection),
        InvoiceCompanyModule,
    ],
    exports: [MiniStoreWarehouseOrdersService],
    controllers: [MiniStoreWarehouseOrdersController],
    providers: [MiniStoreWarehouseOrdersService],
})
export class MiniStoreWarehouseOrdersModule {
}
