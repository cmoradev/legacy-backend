import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MiniStoreSalesPaymentsService } from '../mini-store-sales-payments/mini-store-sales-payments.service';
import * as moment from 'moment-timezone';
import { ChangeStatusInvoiceMiniStoreInterface } from './interface/ChangeStatusInvoiceMiniStore.interface';
import { UsersService } from '../../system/users/users.service';

@Injectable()
export class MiniStoreInvoicesService extends TypeOrmCrudService<MiniStoreInvoice> {
  constructor(
    @InjectRepository(MiniStoreInvoice, 'colegiodb') readonly repo: Repository<MiniStoreInvoice>,
    readonly salesPaymentService: MiniStoreSalesPaymentsService,
    readonly userService: UsersService,
  ) {
    super(repo);
  }

  async changeStautsInvoice(data: ChangeStatusInvoiceMiniStoreInterface) {
    const fecha = moment().tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss');
    const invoice = await this.repo.findOne({ id: data.id });
    invoice.status = data.status;
    invoice.idCancelingAgent = data.idCancelingAgent;
    invoice.agentCanceling = await this.userService.findOne({ id: data.idCancelingAgent });
    invoice.reasonCancellation = data.reasonCancellation;
    invoice.cancellationDate = fecha;
    return await this.repo.save(invoice);
  }

  async changeStautsInvoiceC(id: number, status: number) {
    const invoice = await this.repo.findOne({ id });
    invoice.status = status;
    return await this.repo.save(invoice);
  }

  async changeStautsPayment(id: number, status: number) {
    const payment = await this.salesPaymentService.findOne({ id });
    payment.stamping = status;
    return await this.salesPaymentService.repo.save(payment);
  }

  async saveInvoice(data: MiniStoreInvoice) {
    const invoice = this.repo.create(data);
    this.repo.save(invoice);
  }

}
