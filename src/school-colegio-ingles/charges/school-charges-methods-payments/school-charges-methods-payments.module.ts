import { Module } from '@nestjs/common';
import { SchoolChargesMethodsPaymentsService } from './school-charges-methods-payments.service';
import { SchoolChargesMethodsPaymentsController } from './school-charges-methods-payments.controller';

@Module({
  providers: [SchoolChargesMethodsPaymentsService],
  controllers: [SchoolChargesMethodsPaymentsController]
})
export class SchoolChargesMethodsPaymentsModule {}
