import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CashRegister } from './entities/cash-register.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import moment = require('moment');
import { ReportsCashQuery } from './types/reports.type';

@Injectable()
export class CashRegisterService extends TypeOrmCrudService<CashRegister> {
    constructor(@InjectRepository(CashRegister, ColegioDBNameConnection) repo: Repository<CashRegister>) {
        super(repo);
    }

    async generateDataReport(query: ReportsCashQuery) {
        const salesReturnsQB = this.repo.createQueryBuilder('cashRegister')
            .leftJoinAndSelect('cashRegister.agent', 'agent')
            .leftJoinAndSelect('cashRegister.transactions', 'transactions')
            .leftJoinAndSelect('transactions.payment', 'payment')
            .leftJoinAndSelect('transactions.agent', 'agents')
            .leftJoinAndSelect('cashRegister.movements', 'movements');
        if (query.currentCashier) {
            console.log('in current casheir');
            salesReturnsQB.where('cashRegister.id = :id', {
                id: query.casherId,
            });
        } else {
            console.log('in date');
            console.log(moment(query.startDate).startOf('day').toDate());
            console.log(moment(query.startDate).endOf('day').toDate());
            salesReturnsQB.where('cashRegister.openAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
        }
        // if (query.agentId && query.agentId !== 0) {
        //     salesReturnsQB.andWhere('agent.id = :agentID', { agentID: query.agentId });
        // }

        return await salesReturnsQB.getMany();
    }
}
