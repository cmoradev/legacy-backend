import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Campus } from './entities/campus.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class CampusesService extends TypeOrmCrudService<Campus> {
    constructor(
        @InjectRepository(Campus, ColegioDBNameConnection) repo: Repository<Campus>,
    ) { super(repo); }
}
