import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MiniStoreClassification } from './entities/mini-store-classification.entity';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class MiniStoreClassificationsService extends TypeOrmCrudService<MiniStoreClassification> {
    constructor(
        @InjectRepository(MiniStoreClassification, ColegioDBNameConnection) readonly repo: Repository<MiniStoreClassification>,
    ) { super(repo); }
}
