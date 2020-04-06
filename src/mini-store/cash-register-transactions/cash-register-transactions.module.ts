import { Module } from '@nestjs/common';
import { CashRegisterTransactionsController } from './cash-register-transactions.controller';
import { CashRegisterTransactionsService } from './cash-register-transactions.service';

@Module({
  controllers: [CashRegisterTransactionsController],
  providers: [CashRegisterTransactionsService]
})
export class CashRegisterTransactionsModule {}
