import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InvoiceMethodPayment } from './entities/invoice-method-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesMethodsPaymentsService extends TypeOrmCrudService<InvoiceMethodPayment> {
    constructor(
        @InjectRepository(InvoiceMethodPayment, 'colegiodb') readonly repo: Repository<InvoiceMethodPayment>,
    ) {
        super(repo);
    }

}
