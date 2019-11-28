import { Module } from '@nestjs/common';
import { InvoiceUsesCfdiService } from './invoice-uses-cfdi.service';
import { InvoiceUsesCfdiController } from './invoice-uses-cfdi.controller';

@Module({
  providers: [InvoiceUsesCfdiService],
  controllers: [InvoiceUsesCfdiController]
})
export class InvoiceUsesCfdiModule {}
