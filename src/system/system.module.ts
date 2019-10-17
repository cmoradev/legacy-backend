import { Module } from '@nestjs/common';
import { InvoicesMethodsPaymentsModule } from './invoices-methods-payments/invoices-methods-payments.module';
import { InvoicesBankModule } from './invoices-bank/invoices-bank.module';

@Module({
  imports: [
    InvoicesMethodsPaymentsModule,
    InvoicesBankModule,
  ],
})
export class SystemModule {}
