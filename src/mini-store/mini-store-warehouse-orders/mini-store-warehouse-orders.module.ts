import { Module } from '@nestjs/common';
import { MiniStoreWarehouseOrdersController } from './mini-store-warehouse-orders.controller';
import { MiniStoreWarehouseOrdersService } from './mini-store-warehouse-orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreWarehouseOrder } from './entities/mini-store-warehouse-order.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { BranchOfficeSettingModule } from '../../system/branch-office-setting/branch-office-setting.module';
import { BranchOfficeModule } from "../../system/branch-office/branch-office.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([MiniStoreWarehouseOrder], ColegioDBNameConnection),
        BranchOfficeSettingModule,
        BranchOfficeModule
    ],
    exports: [MiniStoreWarehouseOrdersService],
    controllers: [MiniStoreWarehouseOrdersController],
    providers: [MiniStoreWarehouseOrdersService],
})
export class MiniStoreWarehouseOrdersModule {
}
