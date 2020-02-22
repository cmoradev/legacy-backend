import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolChargesDetailsExtraCharges } from './entities/school-charges-details-extra-charges.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';

@Injectable()
export class SchoolChargesDetailsExtraChargesService extends TypeOrmCrudService<SchoolChargesDetailsExtraCharges> {
    constructor(
        @InjectRepository(SchoolChargesDetailsExtraCharges, ColegioDBNameConnection)
            repo: Repository<SchoolChargesDetailsExtraCharges>,
    ) {
        super(repo);
    }
}
