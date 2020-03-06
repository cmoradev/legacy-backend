import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceCompany } from './entities/invoice-company.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class InvoiceCompanyService extends TypeOrmCrudService<InvoiceCompany> {
  constructor(
    @InjectRepository(InvoiceCompany, ColegioDBNameConnection) repo: Repository<InvoiceCompany>,
  ) {
    super(repo);
  }

  async findCompany(id: number) {
    return await this.repo.findOne({
      where: {
        id,
      },
    });
  }
}
