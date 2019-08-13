import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreInvoiceKey } from './entities/mini-store-invoice-key.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MiniStoreInvoicesKeysService extends TypeOrmCrudService<MiniStoreInvoiceKey> {
    constructor(
        @InjectRepository(MiniStoreInvoiceKey, 'colegiodb') readonly repo: Repository<MiniStoreInvoiceKey>,
    ) { super(repo); }
}
