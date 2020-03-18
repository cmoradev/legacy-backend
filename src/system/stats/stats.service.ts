import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MiniStoreSale } from '../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { StatusPayment } from '../../school-colegio-ingles/school-payments/enums/statusPayment';
import * as moment from 'moment';
import { Student } from '../../school-colegio-ingles/students/entities/student.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { User } from '../users/entities/user.entity';

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

        const startDate = moment(query.startDate).startOf('day').toISOString(true);
        const endDate = moment(query.endDate).endOf('day').toISOString(true);
        const salesQB = this.salesRepository.createQueryBuilder('sale');
        salesQB.leftJoinAndSelect('sale.miniStoreSalePayments', 'payments');
        salesQB.where(`(payments.created_at BETWEEN :startDate AND :endDate)`, {
            startDate,
            endDate,
        });
        salesQB.andWhere('(payments.idStatusPayment = :paidOut OR payments.idStatusPayment = :abonar)', {
            paidOut: StatusPayment.PaiOut,
            abonar: StatusPayment.Abonar,
        });
        const sales = await salesQB.getMany();
        const clients = await this.clientsRepository.count();
        const users = await this.usersRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.department', 'department')
            .where('department.id = :departmentID', { departmentID: 2 })
            .getMany();

        let total = 0;
        for (const sale of sales) {
            total += sale.miniStoreSalePayments.reduce(
                (previousValue: number, currentValue: MiniStoreSalePayment) => {
                    return previousValue + (+currentValue.quantity);
                }, 0);
        }
        return {
            total,
            totalSales: sales.length,
            clients,
            totalCashiers: users.length,
        };
    }
}
