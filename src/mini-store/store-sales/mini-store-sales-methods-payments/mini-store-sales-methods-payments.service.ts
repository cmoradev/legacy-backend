import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSaleMethodPayment } from './entities/mini-store-sale-method-payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';

@Injectable()
export class MiniStoreSalesMethodsPaymentsService extends TypeOrmCrudService<MiniStoreSaleMethodPayment> {
    constructor(
        @InjectRepository(MiniStoreSaleMethodPayment, ColegioDBNameConnection) readonly repo: Repository<MiniStoreSaleMethodPayment>,
    ) {
        super(repo);
    }
}
