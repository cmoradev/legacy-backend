import { Module } from '@nestjs/common';
import { SchoolChargesInvoiceService } from './school-charges-invoice.service';
import { SchoolChargesInvoiceController } from './school-charges-invoice.controller';

@Module({
  providers: [SchoolChargesInvoiceService],
  controllers: [SchoolChargesInvoiceController]
})
export class SchoolChargesInvoiceModule {}
