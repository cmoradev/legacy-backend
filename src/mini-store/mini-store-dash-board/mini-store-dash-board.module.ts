import { Module } from '@nestjs/common';
import { MiniStoreDashBoardService } from './mini-store-dash-board.service';
import { MiniStoreDashBoardController } from './mini-store-dash-board.controller';
import { MiniStoreInvoicesModule } from '../mini-store-invoices/mini-store-invoices.module';

@Module({
  imports: [MiniStoreInvoicesModule],
  providers: [MiniStoreDashBoardService],
  controllers: [MiniStoreDashBoardController],
})
export class MiniStoreDashBoardModule {
}
