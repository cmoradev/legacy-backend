import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PaymentPlanConcept } from './entities/payment-plan-concept.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class PaymentPlanConceptsService extends TypeOrmCrudService<PaymentPlanConcept> {
  constructor(@InjectRepository(PaymentPlanConcept, ColegioDBNameConnection) readonly paymentPlanConceptRepository: Repository<PaymentPlanConcept>) {
    super(paymentPlanConceptRepository);
  }

}
