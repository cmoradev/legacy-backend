import { Module } from '@nestjs/common';
import { AcademyChargePaymentsController } from './academy-charge-payments.controller';
import { AcademyChargePaymentsService } from './academy-charge-payments.service';

@Module({
  controllers: [AcademyChargePaymentsController],
  providers: [AcademyChargePaymentsService]
})
export class AcademyChargePaymentsModule {}
