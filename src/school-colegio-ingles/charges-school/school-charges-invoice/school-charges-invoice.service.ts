import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolChargesInvoice } from './entities/school-charges-invoice.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';

@Injectable()
export class SchoolChargesInvoiceService extends TypeOrmCrudService<SchoolChargesInvoice> {
    constructor(
        @InjectRepository(SchoolChargesInvoice, ColegioDBNameConnection)
            repo: Repository<SchoolChargesInvoice>,
    ) {
        super(repo);
    }
}
