import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { BranchCompany } from './entities/branch-company.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class BranchCompanyService extends TypeOrmCrudService<BranchCompany> {
    constructor(@InjectRepository(BranchCompany, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
