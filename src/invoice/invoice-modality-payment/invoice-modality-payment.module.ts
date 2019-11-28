import { Module } from '@nestjs/common';
import { InvoiceModalityPaymentService } from './invoice-modality-payment.service';
import { InvoiceModalityPaymentController } from './invoice-modality-payment.controller';

@Module({
  providers: [InvoiceModalityPaymentService],
  controllers: [InvoiceModalityPaymentController]
})
export class InvoiceModalityPaymentModule {}
