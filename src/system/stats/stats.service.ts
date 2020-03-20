import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MiniStoreSale } from '../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { StatusPayment } from '../../school-colegio-ingles/school-payments/enums/statusPayment';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Student } from '../../school-colegio-ingles/students/entities/student.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { User } from '../users/entities/user.entity';
import { add, sub } from 'exact-math';
import { MonthRange } from './interfaces/month-range.interface';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(MiniStoreSale, ColegioDBNameConnection)
        private readonly salesRepository: Repository<MiniStoreSale>,
        @InjectRepository(Student, ColegioDBNameConnection)
        private readonly clientsRepository: Repository<Student>,
        @InjectRepository(User, ColegioDBNameConnection)
        private readonly usersRepository: Repository<User>,
    ) {
    }

    async salesRevenue(query: { startDate: string; endDate: string }) {
        const sales = await this.fetchSalesByDateRange(query);
        const clients = await this.clientsRepository.count();
        const users = await this.usersRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.department', 'department')
            .where('department.id = :departmentID', { departmentID: 2 })
            .getMany();
        const today = moment();
        const todaySales = await this.fetchSalesByDateRange({
            endDate: today.toISOString(true),
            startDate: today.toISOString(true),
        });
        const globalSalesResume = this.salesResume(sales);
        const todaySalesResume = this.salesResume(todaySales);
        return {
            clients,
            totalCashiers: users.length,
            globalSales: {
                ...globalSalesResume,
            },
            todaySales: {
                ...todaySalesResume,
            },
        };
    }

    salesResume(sales: MiniStoreSale[]): { totalRevenue: number, totalSales: number } {
        let total = 0;
        for (const sale of sales) {
            sale.miniStoreSalePayments.forEach((payment) => {
                payment.miniStoreSaleMethodPayments.forEach((paymentMethod) => {
                    total = add(total, paymentMethod.quantity);
                });
                total = sub(total, payment.change);
            });
        }
        return {
            totalRevenue: total,
            totalSales: sales.length,
        };
    }

    async fetchSalesByDateRange(query: { startDate: string; endDate: string }): Promise<MiniStoreSale[]> {
        const startDate = moment(query.startDate).startOf('day').toISOString(true);
        const endDate = moment(query.endDate).endOf('day').toISOString(true);
        const salesQB = this.salesRepository.createQueryBuilder('sale');
        salesQB.leftJoinAndSelect('sale.miniStoreSalePayments', 'payments');
        salesQB.leftJoinAndSelect('sale.student', 'student');
        salesQB.leftJoinAndSelect('sale.cashier', 'cashier');
        salesQB.leftJoinAndSelect('payments.miniStoreSaleMethodPayments', 'paymentMethods');
        salesQB.leftJoinAndSelect('paymentMethods.invoiceMethodPayment', 'invoicePaymentMethod');
        salesQB.where(`(payments.created_at BETWEEN :startDate AND :endDate)`, {
            startDate,
            endDate,
        });
        salesQB.andWhere('(payments.idStatusPayment = :paidOut OR payments.idStatusPayment = :abonar)', {
            paidOut: StatusPayment.PaiOut,
            abonar: StatusPayment.Abonar,
        });
        return salesQB.getMany();
    }

    async salesByMonthsOfYear(query: { year: string }) {
        const year = moment(query.year);
        const monthsRanges = this.monthsOfYear(year);
        const results = [];
        for (const month of monthsRanges) {
            const salesByMonth = await this.fetchSalesByDateRange({
                startDate: month.startDate,
                endDate: month.endDate,
            });
            const salesResume = this.salesResume(salesByMonth);
            results.push({
                ...month,
                ...salesResume,
            });
        }
        return results;
    }

    async incomesByPaymentMethodAndMonthsOfYear(query: { year: string }) {
        const year = moment(query.year);
        const monthsRanges = this.monthsOfYear(year);
        const results = [];
        for (const month of monthsRanges) {
            const salesByMonth = await this.fetchSalesByDateRange({
                startDate: month.startDate,
                endDate: month.endDate,
            });
            const salesPaymentMethodsResume = this.paymentMethodsResume(salesByMonth);
            results.push({
                ...salesPaymentMethodsResume,
            });
        }
        return results;
    }

    paymentMethodsResume(sales: MiniStoreSale[]) {

        let cash = 0;
        let cards = 0;
        let others = 0;
        sales.forEach(sale => {
            sale.miniStoreSalePayments.forEach(payment => {
                payment.miniStoreSaleMethodPayments.forEach(paymentMethod => {
                    const paymentCode = paymentMethod.invoiceMethodPayment.code;
                    if (paymentCode === '01') {
                        cash += ((+paymentMethod.quantity) - (+payment.change));
                    } else if (paymentCode === '04' || paymentCode === '28') {
                        cards += (+paymentMethod.quantity);
                    } else {
                        if (+paymentMethod.invoiceMethodPayment.showReport > 0) {
                            others += (+paymentMethod.quantity);
                        }
                    }
                });
            });
        });
        return {
            cash,
            cards,
            others,
            total: cash + cards + others,
        };
    }

    monthsOfYear(year: Moment): MonthRange[] {
        const monthsRanges: MonthRange[] = [];
        for (let monthNumber = 0; monthNumber <= 11; monthNumber++) {
            const month = moment(year).month(monthNumber);
            monthsRanges.push({
                monthNumber,
                startDate: month.startOf('month').toISOString(true),
                endDate: month.endOf('month').toISOString(true),
            });
        }
        return monthsRanges;
    }
}
