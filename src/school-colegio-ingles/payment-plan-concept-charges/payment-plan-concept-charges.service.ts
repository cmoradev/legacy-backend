import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PaymentPlanConceptCharges } from './entities/payment-plan-concept-charges.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentPlanConceptChargesService extends TypeOrmCrudService<PaymentPlanConceptCharges> {
  constructor(@InjectRepository(PaymentPlanConceptCharges, ColegioDBNameConnection) readonly repo: Repository<PaymentPlanConceptCharges>) {
    super(repo);
  }
}
