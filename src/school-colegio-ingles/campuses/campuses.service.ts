import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Campus } from './entities/campus.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CampusesService extends TypeOrmCrudService<Campus> {
    constructor(
        @InjectRepository(Campus, 'colegiodb') repo: Repository<Campus>,
    ) { super(repo); }
}
