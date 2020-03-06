import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Family } from './entities/family.entity';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class FamiliesService extends TypeOrmCrudService<Family> {
    constructor(
        @InjectRepository(Family, ColegioDBNameConnection) readonly repo: Repository<Family>,
    ) { super(repo); }
}
