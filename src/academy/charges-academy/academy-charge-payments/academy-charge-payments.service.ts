import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';

@Injectable()
export class AcademyChargePaymentsService extends TypeOrmCrudService<AcademyChargePayments> {
    constructor(
        @InjectRepository(AcademyChargePayments, ColegioDBNameConnection) readonly repo: Repository<AcademyChargePayments>,
    ) {
        super(repo);
    }
}
