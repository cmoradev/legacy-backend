import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/common/config/config.module';
import { MiniStoreReportsController } from './mini-store-reports-controller';
import { MiniStoreIncomeService } from './mini-store-income-service';
import { MiniStoreInvoiceService } from './mini-store-invoice-service';

@Module({
  imports: [TypeOrmModule.forFeature([]), ConfigModule],
  controllers: [MiniStoreReportsController],
  providers: [
    MiniStoreIncomeService,
    MiniStoreInvoiceService
  ],
})
export class MiniStoreReportsModule {}
