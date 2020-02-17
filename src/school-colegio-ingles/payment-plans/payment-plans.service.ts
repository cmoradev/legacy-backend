import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentPlan } from './entities/payment-plan.entity';

@Injectable()
export class PaymentPlansService extends TypeOrmCrudService<PaymentPlan> {
  constructor(@InjectRepository(PaymentPlan, 'colegiodb') private readonly paymentPlanRepository: Repository<PaymentPlan>) {
    super(paymentPlanRepository);
  }
}
