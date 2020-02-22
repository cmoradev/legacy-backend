import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolChargeDetails } from './entities/school-charge-details.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';

@Injectable()
export class SchoolChargesDetailsService extends TypeOrmCrudService<SchoolChargeDetails> {
    constructor(
        @InjectRepository(SchoolChargeDetails, ColegioDBNameConnection) repo: Repository<SchoolChargeDetails>,
    ) {
        super(repo);
    }
}
