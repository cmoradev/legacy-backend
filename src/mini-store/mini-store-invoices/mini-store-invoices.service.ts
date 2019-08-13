import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MiniStoreInvoicesService extends TypeOrmCrudService<MiniStoreInvoice> {
    constructor(
        @InjectRepository(MiniStoreInvoice, 'colegiodb') readonly repo: Repository<MiniStoreInvoice>,
    ) {
        super(repo);
    }
}
