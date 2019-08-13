import { Module } from '@nestjs/common';
import { MiniStoreSalesPaymentsController } from './mini-store-sales-payments.controller';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ MiniStoreSalePayment ], 'colegiodb') ],
  exports: [MiniStoreSalesPaymentsService ],
  controllers: [MiniStoreSalesPaymentsController],
  providers: [MiniStoreSalesPaymentsService],
})
export class MiniStoreSalesPaymentsModule {}
