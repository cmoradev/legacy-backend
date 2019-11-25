import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MiniStoreSalesPaymentsService extends TypeOrmCrudService<MiniStoreSalePayment> {
  constructor(
    @InjectRepository(MiniStoreSalePayment, 'colegiodb') readonly repo: Repository<MiniStoreSalePayment>,
  ) {
    super(repo);
  }

  async countTotalPayments(dateStart: string, dateEnd: string, id: number) {
    return await this.repo.createQueryBuilder('payments')
      .select('SUM(payments.quantity)', 'sum')
      .where('payments.agentBillingId = :id', { id })
      .andWhere(`DATE(payments.createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'`)
      .getRawOne();

  }
}
