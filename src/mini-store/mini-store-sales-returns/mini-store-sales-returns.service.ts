import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SalesReturns } from './entities/sales-returns.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class MiniStoreSalesReturnsService extends TypeOrmCrudService<SalesReturns> {
    constructor(@InjectRepository(SalesReturns, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
