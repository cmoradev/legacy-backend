import { Module } from '@nestjs/common';
import { PaymentPlansController } from './payment-plans.controller';
import { PaymentPlansService } from './payment-plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPlan } from './entities/payment-plan.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentPlan], ColegioDBNameConnection)],
  exports: [PaymentPlansService],
  controllers: [PaymentPlansController],
  providers: [PaymentPlansService],
})
export class PaymentPlansModule {}
