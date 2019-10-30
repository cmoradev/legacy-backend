import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InvoicesBank } from './entities/invoices-bank.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesBankService extends TypeOrmCrudService<InvoicesBank>{
  constructor(
    @InjectRepository(InvoicesBank, 'colegiodb') readonly repo: Repository<InvoicesBank>,
  ) {
    super(repo);
  }
}
