import { Module } from '@nestjs/common';
import { MiniStoreProductsModule } from './mini-store-products/mini-store-products.module';
import { MiniStoreClassificationsModule } from './mini-store-classifications/mini-store-classifications.module';
import { MiniStorePricesListsModule } from './mini-store-prices-lists/mini-store-prices-lists.module';

@Module({
  imports: [MiniStoreProductsModule, MiniStoreClassificationsModule, MiniStorePricesListsModule],
})
export class MiniStoreModule {}
