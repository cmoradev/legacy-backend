import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { BusinessNameFamily } from './entities/BusinessNameFamily.entity';

@Injectable()
export class FamilyFiscalService extends TypeOrmCrudService<BusinessNameFamily> {
    constructor(
        @InjectRepository(BusinessNameFamily, ColegioDBNameConnection) readonly repo: Repository<BusinessNameFamily>,
    ) {
        super(repo);
    }
}
