import { Module } from '@nestjs/common';
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
import { MiniStoreSalesModule } from '../mini-store-sales/mini-store-sales.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MiniStoreSalePayment,
            User,
            InvoiceMethodPayment,
            MiniStoreSale,
            SalesReturns,
        ], ColegioDBNameConnection),
        InvoiceMethodsPaymentsModule],
    exports: [MiniStoreSalesPaymentsService],
    controllers: [MiniStoreSalesPaymentsController],
    providers: [MiniStoreSalesPaymentsService],
})
export class MiniStoreSalesPaymentsModule {
}
