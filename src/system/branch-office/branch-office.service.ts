import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BranchOffice } from './entities/branch-office.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class BranchOfficeService extends TypeOrmCrudService<BranchOffice> {
    constructor(
        @InjectRepository(BranchOffice, ColegioDBNameConnection) repo: Repository<BranchOffice>,
    ) { super(repo); }
}
