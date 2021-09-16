import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Route } from '../routes/entities/route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Repository } from 'typeorm';
import { RouteAction } from './entities/route-action.entity';

@Injectable()
export class RouteActionService extends TypeOrmCrudService<RouteAction> {
    constructor(
        @InjectRepository(RouteAction, ColegioDBNameConnection) readonly repo: Repository<RouteAction>,
    ) {
        super(repo);
    }

}

