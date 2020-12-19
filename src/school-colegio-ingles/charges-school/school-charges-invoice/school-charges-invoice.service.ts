import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolChargesInvoice } from './entities/school-charges-invoice.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { AcademyChargeInvoice } from '../../../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity';

@Injectable()
export class SchoolChargesInvoiceService extends TypeOrmCrudService<SchoolChargesInvoice> {
  constructor(
    @InjectRepository(SchoolChargesInvoice, ColegioDBNameConnection)
      repo: Repository<SchoolChargesInvoice>,
  ) {
    super(repo);
  }

  async findInvoiceByPayment(options: { paymentId: number, status: StatusInvoce, stamping?: number }) {
    const invoice = this.repo.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.schoolChargePayment', 'schoolChargePayment')
      .where('invoice.status = :status', {
        status: options.status,
      })
      .where('schoolChargePayment.id= :paymentId', {
        paymentId: options.paymentId,
      });
    if (options.stamping) {
      invoice.andWhere('schoolChargePayment.stamping= :stamping', {
        stamping: options.stamping,
      });
    }

    return await invoice.getOne();
  }

  async updateInvoice(data: SchoolChargesInvoice) {
    let invoice = await this.repo.findOne({ id: data.id });
    invoice = { ...data };
    return await this.repo.save(invoice);
  }

  async saveInvoice(data: SchoolChargesInvoice) {
    const invoice = await this.repo.create(data);
    const result = await this.repo.save(invoice);
    return await this.repo.findOne({ id: result.id });
  }
}
