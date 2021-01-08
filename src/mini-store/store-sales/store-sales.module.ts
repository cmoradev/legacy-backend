import { Module } from '@nestjs/common';
import { MiniStoreTransactionModule } from './mini-store-transaction/mini-store-transaction.module';
import { MiniStoreQuotationModule } from './mini-store-quotation/mini-store-quotation.module';

@Module({
  imports: [MiniStoreTransactionModule, MiniStoreQuotationModule]
})
export class StoreSalesModule {}
