import { Module } from '@nestjs/common';
import { MiniStoreInvoicesService } from './mini-store-invoices.service';
import { MiniStoreInvoicesController } from './mini-store-invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ MiniStoreInvoice ], 'colegiodb')],
  exports: [ MiniStoreInvoicesService ],
  providers: [MiniStoreInvoicesService],
  controllers: [MiniStoreInvoicesController],
})
export class MiniStoreInvoicesModule {}
