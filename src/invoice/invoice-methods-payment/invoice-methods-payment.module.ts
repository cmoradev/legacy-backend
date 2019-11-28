import { Module } from '@nestjs/common';
import { InvoiceMethodsPaymentService } from './invoice-methods-payment.service';
import { InvoiceMethodsPaymentController } from './invoice-methods-payment.controller';

@Module({
  providers: [InvoiceMethodsPaymentService],
  controllers: [InvoiceMethodsPaymentController]
})
export class InvoiceMethodsPaymentModule {}
