import { Module } from '@nestjs/common';
import { MiniStoreInvoicesKeysController } from './mini-store-invoices-keys.controller';
import { MiniStoreInvoicesKeysService } from './mini-store-invoices-keys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreInvoiceKey } from './entities/mini-store-invoice-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MiniStoreInvoiceKey], 'colegiodb') ],
  exports: [ MiniStoreInvoicesKeysService ],
  controllers: [MiniStoreInvoicesKeysController],
  providers: [MiniStoreInvoicesKeysService],
})
export class MiniStoreInvoicesKeysModule {}
