import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceKeysModule } from './invoice-keys/invoice-keys.module';
import { InvoiceRegimeModule } from './invoice-regime/invoice-regime.module';
import { InvoiceUnitsModule } from './invoice-units/invoice-units.module';
import { InvoiceUsesCfdiModule } from './invoice-uses-cfdi/invoice-uses-cfdi.module';
import { InvoiceMethodsPaymentModule } from './invoice-methods-payment/invoice-methods-payment.module';
import { InvoiceModalityPaymentModule } from './invoice-modality-payment/invoice-modality-payment.module';

@Module({
  providers: [InvoiceService],
  controllers: [InvoiceController],
  imports: [InvoiceKeysModule, InvoiceRegimeModule, InvoiceUnitsModule, InvoiceUsesCfdiModule, InvoiceMethodsPaymentModule, InvoiceModalityPaymentModule],
})
export class InvoiceModule {
}
