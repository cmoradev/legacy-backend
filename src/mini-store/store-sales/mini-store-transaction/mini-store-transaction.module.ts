import { Module } from '@nestjs/common';
import { MiniStoreTransactionService } from './mini-store-transaction.service';
import { MiniStoreTransactionController } from './mini-store-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesReturns } from '../mini-store-sales-returns/entities/sales-returns.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { MiniStoreTransaction } from './entities/mini-store-transaction.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([MiniStoreTransaction], ColegioDBNameConnection),
    ],
    providers: [MiniStoreTransactionService],
    exports: [MiniStoreTransactionService],
    controllers: [MiniStoreTransactionController],
})
export class MiniStoreTransactionModule {
}
