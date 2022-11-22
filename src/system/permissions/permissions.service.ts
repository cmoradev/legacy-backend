import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class PermissionsService extends TypeOrmCrudService<Permission> {
    constructor(
        @InjectRepository(Permission, ColegioDBNameConnection) readonly repo: Repository<Permission>,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({ id }, { withDeleted: true });
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.restore(id);
    }

    public getRoots() {
        return this.repo.manager.getTreeRepository(Permission).findTrees();
    }
    async getPermissionTree(idrol) {
        // await this.repo.manager.getTreeRepository('permission').createAncestorsQueryBuilder()
        /*const permissions =  await this.repo.manager.getTreeRepository('permission')
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

    public async getPermissionRole(idRol: number) {
        return this.repo.createQueryBuilder('permission')
        .leftJoinAndSelect('permission.route', 'route')
        .leftJoinAndSelect('permission.actions', 'actions')
        .leftJoinAndSelect('permission.role', 'role')
        .select([
            'role.id',
            'role.isActive',
            'role.name',
            'permission.id',
            'route.id',
            'route.isActive',
            'route.name',
            'route.fatherID',
            'route.level',
            'route.url',
            'actions.id',
        ])
        .where('role.id = :id', { id: idRol})
        .andWhere('role.isActive = :active', { active: true })
        .andWhere('route.isActive = :active', { active: 1 }).getMany();
    }

}
