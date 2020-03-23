import { Module } from '@nestjs/common';
import { MiniStoreProductsProvidersService } from './mini-store-products-providers.service';
import { MiniStoreProductsProvidersController } from './mini-store-products-providers.controller';

@Module({
  providers: [MiniStoreProductsProvidersService],
  controllers: [MiniStoreProductsProvidersController]
})
export class MiniStoreProductsProvidersModule {}
