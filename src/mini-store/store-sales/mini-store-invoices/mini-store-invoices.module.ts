import { Module } from '@nestjs/common';
import { MiniStoreInvoicesService } from './mini-store-invoices.service';
import { MiniStoreInvoicesController } from './mini-store-invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';
import { MiniStoreSalesPaymentsModule } from '../mini-store-sales-payments/mini-store-sales-payments.module';
import { UsersModule } from '../../../system/users/users.module';
import { InvoiceCompanyModule } from '../../../invoice/invoice-company/invoice-company.module';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([MiniStoreInvoice], ColegioDBNameConnection),
    MiniStoreSalesPaymentsModule,
    UsersModule,
    InvoiceCompanyModule,
  ],
  exports: [MiniStoreInvoicesService],
  providers: [MiniStoreInvoicesService],
  controllers: [MiniStoreInvoicesController],
})
export class MiniStoreInvoicesModule {
}
