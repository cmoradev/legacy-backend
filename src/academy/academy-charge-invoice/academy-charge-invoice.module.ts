import { Module } from '@nestjs/common';
import { AcademyChargeInvoiceService } from './academy-charge-invoice.service';
import { AcademyChargeInvoiceController } from './academy-charge-invoice.controller';

@Module({
  providers: [AcademyChargeInvoiceService],
  controllers: [AcademyChargeInvoiceController]
})
export class AcademyChargeInvoiceModule {}
