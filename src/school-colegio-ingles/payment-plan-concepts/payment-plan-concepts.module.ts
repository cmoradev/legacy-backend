import { Module } from '@nestjs/common';
import { PaymentPlanConceptsController } from './payment-plan-concepts.controller';
import { PaymentPlanConceptsService } from './payment-plan-concepts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPlanConcept } from './entities/payment-plan-concept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentPlanConcept], 'colegiodb')],
  exports: [PaymentPlanConceptsService],
  controllers: [PaymentPlanConceptsController],
  providers: [PaymentPlanConceptsService],
})
export class PaymentPlanConceptsModule {}
