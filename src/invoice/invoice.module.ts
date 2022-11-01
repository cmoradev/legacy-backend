import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceMethodsPaymentsModule } from './invoice-methods-payments/invoice-methods-payments.module';

@Module({
  providers: [InvoiceService],
  controllers: [InvoiceController],
  imports: [
    InvoiceMethodsPaymentsModule,
  ],
})
export class InvoiceModule {
}
