import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SchoolPaymentCharge } from './entities/school-payment-charge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolPaymentsChargesService extends TypeOrmCrudService<SchoolPaymentCharge> {
  constructor(@InjectRepository(SchoolPaymentCharge, ColegioDBNameConnection) readonly repo: Repository<SchoolPaymentCharge>) {
    super(repo);
  }
}
