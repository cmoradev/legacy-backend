import { Module } from '@nestjs/common';
import { MiniStoreProductsModule } from './mini-store-products/mini-store-products.module';
import { MiniStoreClassificationsModule } from './mini-store-classifications/mini-store-classifications.module';

@Module({
  imports: [MiniStoreProductsModule, MiniStoreClassificationsModule],
})
export class MiniStoreModule {}
