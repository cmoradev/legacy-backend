import { Injectable, NotFoundException } from '@nestjs/common';
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

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({ id }, { withDeleted: true });
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.restore(id);
    }
}
