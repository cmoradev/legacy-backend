import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceKeysModule } from './invoice-keys/invoice-keys.module';
import { InvoiceRegimeModule } from './invoice-regime/invoice-regime.module';
import { InvoiceUnitsModule } from './invoice-units/invoice-units.module';
import { InvoiceUsesCfdiModule } from './invoice-uses-cfdi/invoice-uses-cfdi.module';
import { InvoiceModalityPaymentModule } from './invoice-modality-payment/invoice-modality-payment.module';
import { InvoiceMethodsPaymentsModule } from './invoice-methods-payments/invoice-methods-payments.module';

@Module({
  providers: [InvoiceService],
  controllers: [InvoiceController],
  imports: [
    InvoiceKeysModule,
    InvoiceRegimeModule,
    InvoiceUnitsModule,
    InvoiceUsesCfdiModule,
    InvoiceMethodsPaymentsModule,
    InvoiceModalityPaymentModule,
  ],
})
export class InvoiceModule {
}
