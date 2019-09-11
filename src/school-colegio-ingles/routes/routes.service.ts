import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Route } from './entities/route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getTreeRepository, Repository } from 'typeorm';

@Injectable()
export class RoutesService extends TypeOrmCrudService<Route> {
    constructor(
        @InjectRepository(Route, 'colegiodb') readonly repo: Repository<Route>,
    ) {
        super(repo);
    }

    public getRoots() {
        return this.repo.manager.getTreeRepository(Route).findTrees();
    }
}
