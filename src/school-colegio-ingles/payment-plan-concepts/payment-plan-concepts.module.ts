import { Module } from '@nestjs/common';
import { PaymentPlanConceptsController } from './payment-plan-concepts.controller';
import { PaymentPlanConceptsService } from './payment-plan-concepts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPlanConcept } from './entities/payment-plan-concept.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentPlanConcept], ColegioDBNameConnection)],
  exports: [PaymentPlanConceptsService],
  controllers: [PaymentPlanConceptsController],
  providers: [PaymentPlanConceptsService],
})
export class PaymentPlanConceptsModule {}
