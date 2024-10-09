import { Module } from '@nestjs/common';
import { AcademyReportsController } from './academy-reports-controller';
import { AcademyIncomeService } from './academy-income-service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [AcademyReportsController],
  providers: [AcademyIncomeService],
})
export class AcademyReportsModule {}
