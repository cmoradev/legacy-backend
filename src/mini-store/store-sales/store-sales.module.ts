import { Module } from '@nestjs/common';
import { MiniStoreTransactionModule } from './mini-store-transaction/mini-store-transaction.module';

@Module({
  imports: [MiniStoreTransactionModule]
})
export class StoreSalesModule {}
