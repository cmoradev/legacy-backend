import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Cycle } from './entities/cycle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CyclesService extends TypeOrmCrudService<Cycle> {
    constructor(
        @InjectRepository(Cycle, 'colegiodb') readonly repo: Repository<Cycle>,
    ) { super(repo); }
}
