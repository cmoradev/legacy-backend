import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimpleReport } from './reports/simple.report';
import moment = require('moment');

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

    async fetchFilteredPayments(query: {
        status: number,
        startDate: Date,
        endDate: Date,
        cashier?: number,
    }) {
        const queryBuilder = this.repo.createQueryBuilder('payment');
        queryBuilder.leftJoinAndSelect('payment.agent', 'agent');
        queryBuilder.leftJoinAndSelect('payment.miniStoreSale', 'sale');
        queryBuilder.leftJoinAndSelect('sale.student', 'student');
        queryBuilder.leftJoinAndSelect('payment.miniStoreSaleMethodPayments', 'paymentMethod');
        queryBuilder.leftJoinAndSelect('paymentMethod.invoiceMethod', 'invoiceMethod');
        if (query) {
            queryBuilder.where('payment.idStatusPayment= :paymentStatus', {
                paymentStatus: query.status,
            });
            queryBuilder.andWhere('payment.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.cashier) {
                queryBuilder.andWhere('agent.id = :agentID', { agentID: query.cashier });
            }
        }
        return await queryBuilder.limit(10).getMany();
    }

    async simpleReport(options?: { base64: boolean }): Promise<string | any> {
        const workbook = new SimpleReport().generate();
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
