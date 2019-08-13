import { Module } from '@nestjs/common';
import { MiniStoreProductsModule } from './mini-store-products/mini-store-products.module';

@Module({
  imports: [MiniStoreProductsModule],
})
export class MiniStoreModule {}
