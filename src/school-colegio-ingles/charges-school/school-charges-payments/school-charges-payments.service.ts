import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { SchoolChargePayment } from './entities/school-charge-payment.entity';
import { QuerySchoolPaymentBilling } from '../../school-payments/interfaces/InvoiceSchoolPayment.interface';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';
import { SchoolChargesMethodsPayments } from '../school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import { QuerySimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { User } from '../../../system/users/entities/user.entity';
import * as moment from 'moment';
import { AcademyChargePayments } from '../../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { AcademyCharge } from '../../../academy/charges-academy/academy-charge/entities/academy-charge.entity';
import { SimpleReportAcademy } from '../../../academy/charges-academy/academy-charge-payments/reports/simple.report';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { SimpleReportCollege } from './reports/simple.report';

@Injectable()
export class SchoolChargesPaymentsService extends TypeOrmCrudService<SchoolChargePayment> {
  constructor(
    @InjectRepository(SchoolChargePayment, ColegioDBNameConnection)
    readonly repo: Repository<SchoolChargePayment>,
    @InjectRepository(SchoolCharge, ColegioDBNameConnection)
    readonly schoolChargeRepo: Repository<SchoolCharge>,
    @InjectRepository(User, ColegioDBNameConnection) readonly userRepository: Repository<User>,
    @InjectRepository(InvoiceMethodPayment, ColegioDBNameConnection) readonly invoiceMethodPaymentRepository: Repository<InvoiceMethodPayment>,
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
        'methodsPayments.Bank', // se agregaron para crear el recibo en el server
        'methodsPayments.invoiceMethodPayment', // se agregaron para crear el recibo en el server
        'cashierCharge', // se agregaron para crear el recibo en el server
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
    paymentsQueryBuilder.leftJoinAndSelect('payment.schoolPaymentOffice', 'schoolPaymentOffice');
    paymentsQueryBuilder.leftJoinAndSelect('payment.cashierCharge', 'cashierCharge');
    paymentsQueryBuilder.leftJoinAndSelect('payment.schoolCharge', 'schoolCharge');
    paymentsQueryBuilder.leftJoinAndSelect('schoolCharge.schoolStudent', 'schoolStudent');
    paymentsQueryBuilder.leftJoinAndSelect('payment.methodsPayments', 'methodsPayments');
    paymentsQueryBuilder.leftJoinAndSelect('methodsPayments.invoiceMethodPayment', 'invoiceMethodPayment');
    paymentsQueryBuilder.leftJoinAndSelect('payment.schoolChargesInvoice', 'schoolChargesInvoice');
    paymentsQueryBuilder.orderBy('payment.id', 'DESC');
    if (query) {
      paymentsQueryBuilder.andWhere('payment.paymentStatus= :paymentStatus', {
        paymentStatus: query.status,
      });

      paymentsQueryBuilder.andWhere('payment.createdAt BETWEEN :startDate AND :endDate',
        {
          startDate: moment(query.startDate).startOf('day').toDate(),
          endDate: moment(query.endDate).endOf('day').toDate(),
        });
      if (query.invoiceStatus) {
        paymentsQueryBuilder.andWhere('payment.stamping = :invoiceStatus', { invoiceStatus: query.invoiceStatus });
      }
      if (query.cashier) {
        paymentsQueryBuilder.andWhere('cashierCharge.id = :agentID', { agentID: query.cashier });
      }
    }
    return paymentsQueryBuilder.getMany();
  }

  fetchFilteredSales(query: QuerySimpleReport) {
    const salesQueryBuilder = this.schoolChargeRepo.createQueryBuilder('charge');
    salesQueryBuilder.leftJoinAndSelect('charge.schoolCampus', 'schoolCampus');
    salesQueryBuilder.leftJoinAndSelect('charge.cashier', 'cashier');
    salesQueryBuilder.leftJoinAndSelect('charge.schoolStudent', 'schoolStudent');
    salesQueryBuilder.leftJoinAndSelect('charge.chargesPayments', 'chargesPayments');
    salesQueryBuilder.leftJoinAndSelect('charge.chargesDetails', 'chargesDetails');
    salesQueryBuilder.leftJoinAndSelect('chargesDetails.extraCharges', 'extraCharges');
    salesQueryBuilder.leftJoinAndSelect('chargesDetails.schoolPlanPayment', 'schoolPlanPayment');
    if (query) {
      salesQueryBuilder.andWhere('chargesPayments.paymentStatus= :paymentStatus', {
        paymentStatus: query.status,
      });
      salesQueryBuilder.andWhere('chargesPayments.createdAt BETWEEN :startDate AND :endDate',
        {
          startDate: moment(query.startDate).startOf('day').toDate(),
          endDate: moment(query.endDate).endOf('day').toDate(),
        });
      if (query.cashier) {
        salesQueryBuilder.andWhere('cashier.id = :agentID', { agentID: query.cashier });
      }
    }
    return salesQueryBuilder.getMany();
  }

  public async getUserCasher(): Promise<User[]> {
    const cashiersAndSales = await this.userRepository.find({
      relations: ['schoolChargesPayments', 'department'],
      select: ['id', 'name'],
    });
    const cashiers = cashiersAndSales.filter(cashier => {
      if (cashier.department !== null && cashier.department.id === 2 || cashier.schoolChargesPayments.length > 0) {
        return cashier;
      }
    });
    return cashiers;
  }

  public async simpleReport(payments: SchoolChargePayment[], sales: SchoolCharge[], query: any, options?: { base64: boolean }): Promise<string | any> {
    const cashiersAndSales = await this.userRepository.find({
      relations: ['schoolChargesPayments', 'department', 'role'],
    });
    const paymentMethods = await this.invoiceMethodPaymentRepository.find({
      where: {
        showReport: true,
        isActive: true,
      },
    });
    const cashiers = cashiersAndSales.filter(cashier => {
      if (cashier.role.id === 5 && cashier.department.id === 2 || cashier.schoolChargesPayments.length > 0) {
        return cashier;
      }
    });
    const workbook = new SimpleReportCollege().generate({
      payments,
      cashiers,
      paymentMethods,
      sales,
      query,
    });
    try {
      const fileName = (+new Date()).toString() + '.xlsx';
      if (options && options.base64) {
        const result = await workbook.xlsx.writeBuffer({
            filename: (+new Date()).toString() + '.xlsx',
          },
        );
        const buffer = Buffer.from(result);
        const b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
        return b64Encoding + buffer.toString('base64');

      } else {
        await workbook.xlsx.writeFile('./xls-imports/' + fileName);
        return fileName;
      }
    } catch (e) {
      return e;
    }
  }
}
