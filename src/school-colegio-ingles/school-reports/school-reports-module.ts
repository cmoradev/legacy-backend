import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolIncomeService } from './school-income-service';
import { ConfigModule } from 'src/common/config/config.module';
import { SchoolReportsController } from './school-reports-controller';
import { SchoolInvoiceService } from './school-invoice-service';
import { SchoolIncomeGroupService } from './school-income-group-service';
import { SchoolGroupService } from './school-group-service';
import { SchoolBankStatementService } from './school-bank-statement-service';
import { SchoolDebitService } from './school-debit-service';

@Module({
  imports: [TypeOrmModule.forFeature([]), ConfigModule],
  controllers: [SchoolReportsController],
  providers: [
    SchoolIncomeService,
    SchoolInvoiceService,
    SchoolIncomeGroupService,
    SchoolGroupService,
    SchoolBankStatementService,
    SchoolDebitService
  ],
})
export class SchoolReportsModule {}
