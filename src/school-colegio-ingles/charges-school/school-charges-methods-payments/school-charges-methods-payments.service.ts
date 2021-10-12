import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { SchoolChargesMethodsPayments } from './entities/school-charges-methods-payments.entity';

@Injectable()
export class SchoolChargesMethodsPaymentsService extends TypeOrmCrudService<SchoolChargesMethodsPayments> {
    constructor(
        @InjectRepository(SchoolChargesMethodsPayments, ColegioDBNameConnection)
            repo: Repository<SchoolChargesMethodsPayments>,
    ) {
        super(repo);
    }
}
