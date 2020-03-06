import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceKeys } from './entities/invoice-keys.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class InvoiceKeysService extends TypeOrmCrudService<InvoiceKeys> {
  constructor(
    @InjectRepository(InvoiceKeys, ColegioDBNameConnection) repo: Repository<InvoiceKeys>,
  ) { super(repo); }
}
