import { Module } from '@nestjs/common';
import { InvoiceKeysService } from './invoice-keys.service';
import { InvoiceKeysController } from './invoice-keys.controller';

@Module({
  providers: [InvoiceKeysService],
  controllers: [InvoiceKeysController]
})
export class InvoiceKeysModule {}
