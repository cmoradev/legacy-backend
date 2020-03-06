import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InvoiceMethodPayment } from './entities/invoice-method-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class InvoiceMethodsPaymentsService extends TypeOrmCrudService<InvoiceMethodPayment> {
    constructor(
        @InjectRepository(InvoiceMethodPayment, ColegioDBNameConnection) readonly repo: Repository<InvoiceMethodPayment>,
    ) {
        super(repo);
    }

}
