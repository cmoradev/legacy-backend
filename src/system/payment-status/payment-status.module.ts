import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment-status.service';
import { PaymentStatusController } from './payment-status.controller';

@Module({
  providers: [PaymentStatusService],
  controllers: [PaymentStatusController]
})
export class PaymentStatusModule {}
