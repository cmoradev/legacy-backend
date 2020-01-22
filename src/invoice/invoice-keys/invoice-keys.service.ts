import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceKeys } from './entities/invoice-keys.entity';

@Injectable()
export class InvoiceKeysService extends TypeOrmCrudService<InvoiceKeys> {
  constructor(
    @InjectRepository(InvoiceKeys, 'colegiodb') repo: Repository<InvoiceKeys>,
  ) { super(repo); }
}
