import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { BranchCompany } from './entities/branch-company.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class BranchCompaniesService extends TypeOrmCrudService<BranchCompany> {
    constructor(@InjectRepository(BranchCompany, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
