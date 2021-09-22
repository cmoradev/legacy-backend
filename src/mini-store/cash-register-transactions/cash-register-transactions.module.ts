import { Module } from '@nestjs/common';
import { CashRegisterTransactionsController } from './cash-register-transactions.controller';
import { CashRegisterTransactionsService } from './cash-register-transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashRegisterTransaction } from './entities/cash-register-transaction.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([CashRegisterTransaction], ColegioDBNameConnection)],
    providers: [CashRegisterTransactionsService],
    exports: [CashRegisterTransactionsService],
    controllers: [CashRegisterTransactionsController],
})
export class CashRegisterTransactionsModule {
}
