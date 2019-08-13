import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSaleMethodPayment } from './entities/mini-store-sale-method-payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MiniStoreSalesMethodsPaymentsService extends TypeOrmCrudService<MiniStoreSaleMethodPayment> {
    constructor(
        @InjectRepository(MiniStoreSaleMethodPayment, 'colegiodb') readonly repo: Repository<MiniStoreSaleMethodPayment>,
    ) {
        super(repo);
    }
}
