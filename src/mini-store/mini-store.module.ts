import { Module } from '@nestjs/common';
import { MiniStoreProductsModule } from './mini-store-products/mini-store-products.module';
import { MiniStoreClassificationsModule } from './mini-store-classifications/mini-store-classifications.module';
import { MiniStorePricesListsModule } from './mini-store-prices-lists/mini-store-prices-lists.module';
import { MiniStoreInvoicesKeysModule } from './mini-store-invoices-keys/mini-store-invoices-keys.module';
import { MiniStoreInvoicesModule } from './mini-store-invoices/mini-store-invoices.module';
import { MiniStoreSalesModule } from './mini-store-sales/mini-store-sales.module';
import { MiniStorePaymentsStatusModule } from './mini-store-payments-status/mini-store-payments-status.module';

@Module({
    imports: [
        MiniStoreProductsModule,
        MiniStoreClassificationsModule,
        MiniStorePricesListsModule,
        MiniStoreInvoicesKeysModule,
        MiniStoreInvoicesModule,
        MiniStoreSalesModule,
        MiniStorePaymentsStatusModule,
    ],
})
export class MiniStoreModule {
}
