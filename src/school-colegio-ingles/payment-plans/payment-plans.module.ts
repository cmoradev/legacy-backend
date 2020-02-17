import { Module } from '@nestjs/common';
import { PaymentPlansController } from './payment-plans.controller';
import { PaymentPlansService } from './payment-plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPlan } from './entities/payment-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentPlan], 'colegiodb')],
  exports: [PaymentPlansService],
  controllers: [PaymentPlansController],
  providers: [PaymentPlansService],
})
export class PaymentPlansModule {}
