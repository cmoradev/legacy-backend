import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyBankStatementService } from './academy-bank-statement-service';
import { AcademyIncomeService } from './academy-income-service';
import { AcademyReportsController } from './academy-reports-controller';
import { IncomeService } from './income-service';
import { InvoiceService } from './invoice-service';
import { GroupService } from './group-service';
import { ConfigModule } from 'src/common/config/config.module';

@Module({
  imports: [TypeOrmModule.forFeature([]), ConfigModule],
  controllers: [AcademyReportsController],
  providers: [
    AcademyIncomeService,
    IncomeService,
    InvoiceService,
    GroupService,
    AcademyBankStatementService,
  ],
})
export class AcademyReportsModule {}
