import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { MiniStoreTransaction } from './entities/mini-store-transaction.entity';

@Injectable()
export class MiniStoreTransactionService extends TypeOrmCrudService<MiniStoreTransaction> {
    constructor(@InjectRepository(MiniStoreTransaction, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
