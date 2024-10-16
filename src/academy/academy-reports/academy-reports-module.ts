import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyBankStatementService } from './academy-bank-statement-service';
import { AcademyIncomeService } from './academy-income-service';
import { AcademyReportsController } from './academy-reports-controller';
import { IncomeService } from './income-service';
import { InvoiceService } from './invoice-service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [AcademyReportsController],
  providers: [AcademyIncomeService, AcademyBankStatementService, IncomeService, InvoiceService],
})
export class AcademyReportsModule {}
