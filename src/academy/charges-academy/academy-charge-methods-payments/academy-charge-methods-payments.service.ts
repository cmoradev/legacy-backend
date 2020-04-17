import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeMethodsPayments } from './entities/academy-charge-methods-payments.entity';

@Injectable()
export class AcademyChargeMethodsPaymentsService extends TypeOrmCrudService<AcademyChargeMethodsPayments> {
    constructor(
        @InjectRepository(AcademyChargeMethodsPayments, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeMethodsPayments>,
    ) {
        super(repo);
    }
}
