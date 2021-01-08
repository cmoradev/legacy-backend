import { Module } from '@nestjs/common';
import { MiniStoreSalesController } from './mini-store-sales.controller';
import { MiniStoreSalesService } from './mini-store-sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { MiniStoreSalesPaymentsModule } from '../mini-store-sales-payments/mini-store-sales-payments.module';
import { MiniStoreQuotationModule } from '../mini-store-quotation/mini-store-quotation.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([MiniStoreSale], ColegioDBNameConnection),
        MiniStoreSalesPaymentsModule,
        MiniStoreQuotationModule
    ],
    exports: [MiniStoreSalesService],
    controllers: [MiniStoreSalesController],
    providers: [MiniStoreSalesService],
})
export class MiniStoreSalesModule {
}
