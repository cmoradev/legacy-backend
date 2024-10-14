import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyIncomeService } from './academy-income-service';
import { AcademyReportsController } from './academy-reports-controller';
import { IncomeService } from './income-service';
import { InvoiceService } from './invoice-service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [AcademyReportsController],
  providers: [AcademyIncomeService, IncomeService, InvoiceService],
})
export class AcademyReportsModule {}
