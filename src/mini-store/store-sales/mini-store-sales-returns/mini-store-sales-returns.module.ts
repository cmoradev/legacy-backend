import { Module } from '@nestjs/common';
import { MiniStoreSalesReturnsService } from './mini-store-sales-returns.service';
import { MiniStoreSalesReturnsController } from './mini-store-sales-returns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesReturns } from './entities/sales-returns.entity';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { BranchOfficeSettingModule } from '../../../system/branch-office-setting/branch-office-setting.module';
import { MiniStoreInvoicesModule } from '../mini-store-invoices/mini-store-invoices.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesReturns], ColegioDBNameConnection),
    BranchOfficeSettingModule,
    MiniStoreInvoicesModule,
  ],
  providers: [MiniStoreSalesReturnsService],
  exports: [MiniStoreSalesReturnsService],
  controllers: [MiniStoreSalesReturnsController],
})
export class MiniStoreSalesReturnsModule {
}