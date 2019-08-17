import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionsService extends TypeOrmCrudService<Permission> {
    constructor(
        @InjectRepository(Permission, 'colegiodb') readonly repo: Repository<Permission>,
    ) {
        super(repo);
    }

    public getRoots() {
        return this.repo.manager.getTreeRepository(Permission).findTrees();
    }

}
