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
    async getPermissionTree(idrol) {
        // await this.repo.manager.getTreeRepository('permission').createAncestorsQueryBuilder()
        /* const permissions =  await this.repo.manager.getTreeRepository('permission')
          .leftJoinAndSelect('permission.route', 'route', 'permission.route = route.id')
          .leftJoinAndSelect('permission.role', 'role', 'permission.role = role.id')
          .where('permission.role = :id', { id: idrol })
          .andWhere('role.isActive = :active', { active: true })
          .andWhere('route.isActive = :active', { active: 1 })
          .getMany() ;
        return permissions.map((data) => {
            return data.route;
        });*/
    }

}
