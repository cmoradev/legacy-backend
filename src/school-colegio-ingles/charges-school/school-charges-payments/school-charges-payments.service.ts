import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { SchoolChargePayment } from './entities/school-charge-payment.entity';

@Injectable()
export class SchoolChargesPaymentsService extends TypeOrmCrudService<SchoolChargePayment> {
    constructor(
        @InjectRepository(SchoolChargePayment, ColegioDBNameConnection)
            repo: Repository<SchoolChargePayment>,
    ) {
        super(repo);
    }
}
