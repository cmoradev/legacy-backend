import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CashRegisterTransaction } from './entities/cash-register-transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';

@Injectable()
export class CashRegisterTransactionsService extends TypeOrmCrudService<CashRegisterTransaction> {
    constructor(@InjectRepository(CashRegisterTransaction, ColegioDBNameConnection) transactionRepository: Repository<CashRegisterTransaction>) {
        super(transactionRepository);
    }
}
