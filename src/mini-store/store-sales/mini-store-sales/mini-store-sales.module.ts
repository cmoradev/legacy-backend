import { Module } from '@nestjs/common';
import { MiniStoreSalesController } from './mini-store-sales.controller';
import { MiniStoreSalesService } from './mini-store-sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { MiniStoreSalesPaymentsModule } from '../mini-store-sales-payments/mini-store-sales-payments.module';
import { MiniStoreQuotationModule } from '../mini-store-quotation/mini-store-quotation.module';
import { MiniStoreSalesResolver } from './mini-store-sales.resolver';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { MiniStoreSaleDto } from './entities/mini-store-sale.dto';

@Module({
    imports: [
        TypeOrmModule.forFeature([MiniStoreSale], ColegioDBNameConnection),
        MiniStoreSalesPaymentsModule,
        MiniStoreQuotationModule,
    ],
    exports: [MiniStoreSalesService],
    controllers: [MiniStoreSalesController],
    providers: [
        MiniStoreSalesService,
        MiniStoreSalesResolver,
    ],
})
export class MiniStoreSalesModule {
}
