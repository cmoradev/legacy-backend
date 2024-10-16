import { Module } from '@nestjs/common';
import { AcademyReportsController } from './academy-reports-controller';
import { AcademyIncomeService } from './academy-income-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyBankStatementService } from './academy-bank-statement-service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [AcademyReportsController],
  providers: [AcademyIncomeService, AcademyBankStatementService],
})
export class AcademyReportsModule {}
