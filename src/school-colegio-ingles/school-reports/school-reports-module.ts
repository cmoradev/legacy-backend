import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolIncomeService } from './school-income-service';
import { ConfigModule } from 'src/common/config/config.module';
import { SchoolReportsController } from './school-reports-controller';
import { SchoolInvoiceService } from './school-invoice-service';

@Module({
  imports: [TypeOrmModule.forFeature([]), ConfigModule],
  controllers: [SchoolReportsController],
  providers: [
    SchoolIncomeService,
    SchoolInvoiceService
  ],
})
export class SchoolReportsModule {}
