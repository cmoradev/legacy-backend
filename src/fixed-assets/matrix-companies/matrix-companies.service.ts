import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { MatrixCompany } from './entities/matrix-company.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class MatrixCompanyService extends TypeOrmCrudService<MatrixCompany> {
    constructor(@InjectRepository(MatrixCompany, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
