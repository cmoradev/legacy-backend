import { Module } from '@nestjs/common';
import { InvoiceRegimeService } from './invoice-regime.service';
import { InvoiceRegimeController } from './invoice-regime.controller';

@Module({
  providers: [InvoiceRegimeService],
  controllers: [InvoiceRegimeController]
})
export class InvoiceRegimeModule {}
