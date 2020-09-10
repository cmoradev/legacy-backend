import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CashRegister } from './entities/cash-register.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';

@Injectable()
export class CashRegisterService extends TypeOrmCrudService<CashRegister> {
    constructor(@InjectRepository(CashRegister, ColegioDBNameConnection) repo: Repository<CashRegister>) {
        super(repo);
    }

    async generateDataReport() {
        const salesReturnsQB = this.repo.createQueryBuilder('cashRegister')
            .leftJoinAndSelect('cashRegister.agent', 'agent')
            .leftJoinAndSelect('cashRegister.transactions', 'transactions')
            .leftJoinAndSelect('transactions.payment', 'payment')
            .leftJoinAndSelect('cashRegister.movements', 'movements');
    }
}
