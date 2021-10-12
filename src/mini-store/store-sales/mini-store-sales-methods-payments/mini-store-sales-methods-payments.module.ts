import { Module } from '@nestjs/common';
import { MiniStoreSalesMethodsPaymentsService } from './mini-store-sales-methods-payments.service';
import { MiniStoreSalesMethodsPaymentsController } from './mini-store-sales-methods-payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreSaleMethodPayment } from './entities/mini-store-sale-method-payment.entity';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ MiniStoreSaleMethodPayment ], ColegioDBNameConnection) ],
    exports: [ MiniStoreSalesMethodsPaymentsService ],
    providers: [MiniStoreSalesMethodsPaymentsService],
    controllers: [MiniStoreSalesMethodsPaymentsController],
})
export class MiniStoreSalesMethodsPaymentsModule {
}
