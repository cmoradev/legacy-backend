import { Module } from '@nestjs/common';
import { InvoicesMethodsPaymentsModule } from './invoices-methods-payments/invoices-methods-payments.module';

@Module({
  imports: [
    InvoicesMethodsPaymentsModule,
  ],
})
export class SystemModule {}
