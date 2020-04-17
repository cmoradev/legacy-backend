import { Module } from '@nestjs/common';
import { AcademyChargeMethodsPaymentsController } from './academy-charge-methods-payments.controller';
import { AcademyChargeMethodsPaymentsService } from './academy-charge-methods-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { AcademyChargeMethodsPayments } from './entities/academy-charge-methods-payments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyChargeMethodsPayments], ColegioDBNameConnection)],
  controllers: [AcademyChargeMethodsPaymentsController],
  providers: [AcademyChargeMethodsPaymentsService]
})
export class AcademyChargeMethodsPaymentsModule {}
