import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolCharge } from './entities/school-charge.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';

@Injectable()
export class SchoolChargesService extends TypeOrmCrudService<SchoolCharge> {
    constructor(
        @InjectRepository(SchoolCharge, ColegioDBNameConnection) repo: Repository<SchoolCharge>,
    ) {
        super(repo);
    }
}
