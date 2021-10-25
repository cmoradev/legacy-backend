import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Route } from './entities/route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getTreeRepository, Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class RoutesService extends TypeOrmCrudService<Route> {
    constructor(
        @InjectRepository(Route, ColegioDBNameConnection) readonly repo: Repository<Route>,
    ) {
        super(repo);
    }

    public getRoots() {
        return this.repo.manager.getTreeRepository(Route).findTrees();
    }
}
