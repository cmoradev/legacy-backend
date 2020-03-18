import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimpleReport } from './reports/simple.report';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { SalesReturns } from '../mini-store-sales-returns/entities/sales-returns.entity';
import { User } from '../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import moment = require('moment');
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';

@Injectable()
export class MiniStoreSalesPaymentsService extends TypeOrmCrudService<MiniStoreSalePayment> {
    constructor(
        @InjectRepository(MiniStoreSalePayment, ColegioDBNameConnection) readonly repo: Repository<MiniStoreSalePayment>,
        @InjectRepository(SalesReturns, ColegioDBNameConnection) readonly salesReturnsRepository: Repository<SalesReturns>,
        @InjectRepository(User, ColegioDBNameConnection) readonly userRepository: Repository<User>,
        @InjectRepository(MiniStoreSale, ColegioDBNameConnection) readonly salesRepository: Repository<MiniStoreSale>,
        @InjectRepository(InvoiceMethodPayment, ColegioDBNameConnection)
        readonly invoiceMethodPaymentRepository: Repository<InvoiceMethodPayment>,
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

    async fetchFilteredReturns(query: {
        status: number,
        startDate: Date,
        endDate: Date,
        cashier?: number,
        invoiceStatus?: number,
    }) {
        const salesReturnsQB = this.salesReturnsRepository.createQueryBuilder('saleReturn');
        salesReturnsQB.leftJoinAndSelect('saleReturn.agent', 'agent');
        salesReturnsQB.leftJoinAndSelect('saleReturn.sale', 'sale');
        salesReturnsQB.leftJoinAndSelect('saleReturn.details', 'details');
        salesReturnsQB.leftJoinAndSelect('details.saleDetail', 'saleDetail');
        salesReturnsQB.leftJoinAndSelect('saleDetail.miniStoreProduct', 'product');
        salesReturnsQB.leftJoinAndSelect('sale.student', 'student');
        salesReturnsQB.leftJoinAndSelect('saleReturn.paymentMethod', 'paymentMethod');
        if (query) {
            salesReturnsQB.andWhere('saleReturn.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.cashier) {
                salesReturnsQB.andWhere('agent.id = :agentID', { agentID: query.cashier });
            }
        }
        return salesReturnsQB.getMany();
    }

    async fetchFilteredPayments(query: {
        status: number,
        startDate: Date,
        endDate: Date,
        cashier?: number,
        invoiceStatus?: number,
    }): Promise<MiniStoreSalePayment[]> {
        const paymentsQueryBuilder = this.repo.createQueryBuilder('payment');
        paymentsQueryBuilder.leftJoinAndSelect('payment.agent', 'agent');
        paymentsQueryBuilder.leftJoinAndSelect('payment.miniStoreSale', 'sale');
        paymentsQueryBuilder.leftJoinAndSelect('sale.student', 'student');
        paymentsQueryBuilder.leftJoinAndSelect('payment.miniStoreSaleMethodPayments', 'paymentMethod');
        paymentsQueryBuilder.leftJoinAndSelect('paymentMethod.invoiceMethod', 'invoiceMethod');
        if (query) {
            paymentsQueryBuilder.where('payment.idStatusPayment= :paymentStatus', {
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
                paymentsQueryBuilder.andWhere('agent.id = :agentID', { agentID: query.cashier });
            }
        }
        return await paymentsQueryBuilder.getMany();
    }

    async fetchFilteredSales(query: {
        status: number;
        startDate: Date;
        endDate: Date; cashier?: number
        invoiceStatus?: number,
    }): Promise<MiniStoreSale[]> {
        const salesQueryBuilder = this.salesRepository.createQueryBuilder('sale');
        salesQueryBuilder.leftJoinAndSelect('sale.cashier', 'agent');
        salesQueryBuilder.leftJoinAndSelect('sale.student', 'student');
        salesQueryBuilder.leftJoinAndSelect('sale.miniStoreSalePayments', 'payments');
        salesQueryBuilder.leftJoinAndSelect('sale.miniStoreSaleDetails', 'details');
        salesQueryBuilder.leftJoinAndSelect('details.miniStoreProduct', 'products');
        if (query) {
            salesQueryBuilder.where('payments.idStatusPayment= :paymentStatus', {
                paymentStatus: query.status,
            });
            if (query.invoiceStatus) {
                salesQueryBuilder.andWhere('payments.stamping= :invoiceStatus', {
                        invoiceStatus: query.invoiceStatus,
                    },
                );
            }
            salesQueryBuilder.andWhere('payments.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.cashier) {
                salesQueryBuilder.andWhere('agent.id = :agentID', { agentID: query.cashier });
            }
        }
        return await salesQueryBuilder.getMany();
    }

    public async getUserCasher(): Promise<User[]> {
        const cashiersAndSales = await this.userRepository.find({
            relations: ['salePayments', 'department'],
            select: ['id', 'name'],
        });
        const cashiers = cashiersAndSales.filter(cashier => {
            if (cashier.department !== null && cashier.department.id === 2 || cashier.salePayments.length > 0) {
                return cashier;
            }
        });
        return cashiers;
    }

    async simpleReport(payments: MiniStoreSalePayment[], sales: MiniStoreSale[], salesReturns: SalesReturns[],
                       options?: { base64: boolean }): Promise<string | any> {
        const cashiersAndSales = await this.userRepository.find({
            relations: ['salePayments', 'department', 'role'],
        });

        const paymentMethods = await this.invoiceMethodPaymentRepository.find({
            where: {
                showReport: true,
                isActive: true,
            },
        });

        const cashiers = cashiersAndSales.filter(cashier => {
            if (cashier.role.id === 5 && cashier.department.id === 2 || cashier.salePayments.length > 0) {
                return cashier;
            }
        });
        const workbook = new SimpleReport().generate({
            payments,
            cashiers,
            paymentMethods,
            salesReturns,
            sales,
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
