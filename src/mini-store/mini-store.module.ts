import { Module } from '@nestjs/common';
import { MiniStoreProductsModule } from './mini-store-products/mini-store-products.module';
import { MiniStoreClassificationsModule } from './mini-store-classifications/mini-store-classifications.module';
import { MiniStorePricesListsModule } from './mini-store-prices-lists/mini-store-prices-lists.module';
import { MiniStoreInvoicesModule } from './store-sales/mini-store-invoices/mini-store-invoices.module';
import { MiniStoreSalesModule } from './store-sales/mini-store-sales/mini-store-sales.module';
import { MiniStoreSalesPaymentsModule } from './store-sales/mini-store-sales-payments/mini-store-sales-payments.module';
import { MiniStoreSalesMethodsPaymentsModule } from './store-sales/mini-store-sales-methods-payments/mini-store-sales-methods-payments.module';
import { MiniStoreSalesDetailsModule } from './store-sales/mini-store-sales-details/mini-store-sales-details.module';
import { MiniStoreWarehouseOrdersModule } from './mini-store-warehouse-orders/mini-store-warehouse-orders.module';
import { MiniStoreWarehouseOrdersProductsModule } from './mini-store-warehouse-orders-products/mini-store-warehouse-orders-products.module';
import { MiniStoreWarehouseProvidersModule } from './mini-store-warehouse-providers/mini-store-warehouse-providers.module';
import { MiniStoreDashBoardModule } from './mini-store-dash-board/mini-store-dash-board.module';
import { MiniStoreSalesReturnsModule } from './store-sales/mini-store-sales-returns/mini-store-sales-returns.module';
import { StoreSalesModule } from './store-sales/store-sales.module';

@Module({
    imports: [
        MiniStoreProductsModule,
        MiniStoreClassificationsModule,
        MiniStorePricesListsModule,
        MiniStoreInvoicesModule,
        MiniStoreSalesModule,
        MiniStoreSalesPaymentsModule,
        MiniStoreSalesMethodsPaymentsModule,
        MiniStoreSalesDetailsModule,
        MiniStoreWarehouseOrdersModule,
        MiniStoreWarehouseOrdersProductsModule,
        MiniStoreWarehouseProvidersModule,
        MiniStoreDashBoardModule,
        MiniStoreSalesReturnsModule,
        StoreSalesModule,
    ],
})
export class MiniStoreModule {
}
