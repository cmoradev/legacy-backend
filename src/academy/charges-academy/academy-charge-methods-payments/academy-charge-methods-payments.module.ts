import { Module } from '@nestjs/common';
import { AcademyChargeMethodsPaymentsController } from './academy-charge-methods-payments.controller';
import { AcademyChargeMethodsPaymentsService } from './academy-charge-methods-payments.service';

@Module({
  controllers: [AcademyChargeMethodsPaymentsController],
  providers: [AcademyChargeMethodsPaymentsService]
})
export class AcademyChargeMethodsPaymentsModule {}
