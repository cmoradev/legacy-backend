import { Module } from '@nestjs/common';
import { PaymentPlanConceptChargesService } from './payment-plan-concept-charges.service';
import { PaymentPlanConceptChargesController } from './payment-plan-concept-charges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPlanConceptCharges } from './entities/payment-plan-concept-charges.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ PaymentPlanConceptCharges ], ColegioDBNameConnection) ],
  providers: [ PaymentPlanConceptChargesService ],
  controllers: [ PaymentPlanConceptChargesController ],
})
export class PaymentPlanConceptChargesModule {
}
