import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeInvoice } from './entities/academy-charge-invoice.entity';

@Injectable()
export class AcademyChargeInvoiceService extends TypeOrmCrudService<AcademyChargeInvoice> {
  constructor(
    @InjectRepository(AcademyChargeInvoice, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeInvoice>,
  ) {
    super(repo);
  }
}
