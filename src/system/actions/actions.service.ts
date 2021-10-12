import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Action } from './entities/action.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class ActionsService extends TypeOrmCrudService<Action> {
    constructor(
        @InjectRepository(Action, ColegioDBNameConnection) readonly repo: Repository<Action>,
    ) {
        super(repo);
    }
}
