import { Module } from '@nestjs/common';
import { MiniStoreDashBoardService } from './mini-store-dash-board.service';
import { MiniStoreDashBoardController } from './mini-store-dash-board.controller';
import { UsersModule } from '../../system/users/users.module';
import { MiniStoreInvoicesModule } from '../store-sales/mini-store-invoices/mini-store-invoices.module';
import { MiniStoreSalesPaymentsModule } from '../store-sales/mini-store-sales-payments/mini-store-sales-payments.module';

@Module({
  imports: [
    UsersModule,
    MiniStoreInvoicesModule,
    MiniStoreSalesPaymentsModule,
  ],
  providers: [MiniStoreDashBoardService],
  controllers: [MiniStoreDashBoardController],
})
export class MiniStoreDashBoardModule {
}
