import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SchoolPayment } from './entities/school-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolPaymentsService extends TypeOrmCrudService<SchoolPayment> {
  constructor(
    @InjectRepository(SchoolPayment, ColegioDBNameConnection)
    schoolPaymentRepository: Repository<SchoolPayment>,
  ) {
    super(schoolPaymentRepository);
  }
}
