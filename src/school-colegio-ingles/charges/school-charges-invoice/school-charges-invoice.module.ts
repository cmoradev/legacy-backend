import { Module } from '@nestjs/common';
import { SchoolChargesInvoiceService } from './school-charges-payments-invoice.service';
import { SchoolChargesInvoiceController } from './school-charges-payments-invoice.controller';

@Module({
  providers: [SchoolChargesInvoiceService],
  controllers: [SchoolChargesInvoiceController]
})
export class SchoolChargesInvoiceModule {}
