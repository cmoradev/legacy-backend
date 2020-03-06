import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Cycle } from './entities/cycle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class CyclesService extends TypeOrmCrudService<Cycle> {
    constructor(
        @InjectRepository(Cycle, ColegioDBNameConnection) readonly repo: Repository<Cycle>,
    ) { super(repo); }
}
