import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { SchoolChargePayment } from './entities/school-charge-payment.entity';
import { QuerySchoolPaymentBilling } from '../../school-payments/interfaces/InvoiceSchoolPayment.interface';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';
import { SchoolChargesMethodsPayments } from '../school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import { AcademyChargeMethodsPayments } from '../../../academy/charges-academy/academy-charge-methods-payments/entities/academy-charge-methods-payments.entity';
import { AcademyChargePayments } from '../../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { QuerySimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';

@Injectable()
export class SchoolChargesPaymentsService extends TypeOrmCrudService<SchoolChargePayment> {
  constructor(
    @InjectRepository(SchoolChargePayment, ColegioDBNameConnection)
    readonly repo: Repository<SchoolChargePayment>,
    @InjectRepository(SchoolCharge, ColegioDBNameConnection)
    readonly schoolChargeRepo: Repository<SchoolCharge>,
  ) {
    super(repo);
  }

  getHighestPayment(formadepago: SchoolChargesMethodsPayments[]) {
    const methodpaymenst = formadepago.sort((a, b) => {
      return a.quantity - b.quantity;
    });

    return methodpaymenst[0];
  }

  async findSaleByPayment(query: QuerySchoolPaymentBilling): Promise<{
    charge: SchoolCharge,
    payment: SchoolChargePayment,
    highestPayment: SchoolChargesMethodsPayments
  }> {
    const charge = await this.schoolChargeRepo.findOne({
      where: {
        id: query.chargeId,
      },
      relations: [
        'chargesDetails',
        'chargesDetails.schoolPlanPayment',
        'chargesDetails.extraCharges',
      ],
    });
    const payment = await this.repo.findOne({
      where: {
        id: query.chargePaymentId,
      },
      relations: [
        'methodsPayments',
      ],
    });
    const highestPayment = this.getHighestPayment(payment.methodsPayments);
    return {
      charge,
      payment,
      highestPayment,
    };
  }

  async updatePayment(data: SchoolChargePayment) {
    let payment = await this.repo.findOne({ id: data.id });
    payment = { ...data };
    return await this.repo.save(payment);
  }

  async fetchFilteredPayments(query: QuerySimpleReport) {
    const paymentsQueryBuilder = this.repo.createQueryBuilder('payment');

  }
}
