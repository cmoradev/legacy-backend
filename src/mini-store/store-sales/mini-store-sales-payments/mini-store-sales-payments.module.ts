import { forwardRef, Module } from '@nestjs/common';
import { MiniStoreSalesPaymentsController } from './mini-store-sales-payments.controller';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { SalesReturns } from '../mini-store-sales-returns/entities/sales-returns.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { User } from '../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';
import { InvoiceMethodsPaymentsModule } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.module';
import { MiniStoreInvoicesModule } from '../mini-store-invoices/mini-store-invoices.module';
import { BranchOfficeSettingModule } from '../../../system/branch-office-setting/branch-office-setting.module';
import { MiniStoreInvoice } from '../mini-store-invoices/entities/mini-store-invoice.entity';
import { SmartWeb } from '../../../Provider/swsmart.provider';
import { BranchOfficeModule } from '../../../system/branch-office/branch-office.module';
import { MiniStoreSalesPaymentsReportController } from './mini-store-sales-payments.report.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MiniStoreSalePayment,
            User,
            InvoiceMethodPayment,
            MiniStoreSale,
            MiniStoreInvoice,
            SalesReturns,
        ], ColegioDBNameConnection),
        forwardRef(() => MiniStoreInvoicesModule),
        BranchOfficeModule,
        BranchOfficeSettingModule,
        InvoiceMethodsPaymentsModule,
    ],
    exports: [
        MiniStoreSalesPaymentsService,
    ],
    controllers: [
        MiniStoreSalesPaymentsController,
        MiniStoreSalesPaymentsReportController,
    ],
    providers: [MiniStoreSalesPaymentsService, SmartWeb],
})
export class MiniStoreSalesPaymentsModule {
}
