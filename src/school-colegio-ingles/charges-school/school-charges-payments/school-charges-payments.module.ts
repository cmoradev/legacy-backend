import { Module } from '@nestjs/common';
import { SchoolChargesPaymentsService } from './school-charges-payments.service';
import { SchoolChargesPaymentsController } from './school-charges-payments.controller';

@Module({
  providers: [SchoolChargesPaymentsService],
  controllers: [SchoolChargesPaymentsController]
})
export class SchoolChargesPaymentsModule {}
