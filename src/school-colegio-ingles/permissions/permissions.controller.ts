import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Permission } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';
import { PermissionDto } from './DTO/permission.dto';

@Crud({
    model: {
        type: Permission,
    },
    query: {
        join: {
            role: {},
            route: {},
        },
    },
})
@Controller()
export class PermissionsController implements CrudController<Permission> {
    constructor(
        readonly service: PermissionsService,
    ) {
    }

    get base(): CrudController<Permission> {
        return this;
    }

    @Get('roots')
    async getRoots() {
        return await this.service.getRoots();

    }

    @Post('assignpermissions')
    async assingPermission(@Body() assignper: PermissionDto) {
        // const permission = await this.service.repo.findOne({ where: { roleId: assignper.roleId, routeId: assignper.routeId }})
        const permission = await this.service.repo.findOne({
            where: {
                role: {
                    id: assignper.roleId,
                },
                route: {
                    id: assignper.routeId,
                },
            },
        });
        if (permission) {
            return await this.service.repo.delete(permission.id);
        } else {
            const newperrmision = this.service.repo.create({
                role: {
                    id: assignper.roleId,
                },
                route: {
                    id: assignper.routeId,
                },
            });
            return await this.service.repo.save(newperrmision);
        }
        // return assignper; // return await this.service.getRoots();
    }

    @Get('assignpermissions/:id')
    async getFlatPermission(@Param('id') idrol: any) {
        const permissions = await this.service.repo.find({
            where: {
                role: {
                    id: idrol,
                },
            },
            select: ['routeId'],
        });
        return permissions.map((data) => {
            return data.routeId;
        });
    }

  @Get('getpermission/:id')
  async getTreePermission(@Param('id') idrol: number) {
    /*await this.service.repo.find({
       where: {
         role: {
           id: idrol,
         },
         route: {
           isActive: 0,
         },
       },
       relations: ['route', 'role'],
     });*/
    const permissions =  await this.service.repo.createQueryBuilder('permission')
      .leftJoinAndSelect('permission.route', 'route', 'permission.route = route.id')
      .leftJoinAndSelect('permission.role', 'role', 'permission.role = role.id')
      .where('permission.role = :id', { id: idrol })
      .andWhere('role.isActive = :active', { active: true })
      .andWhere('route.isActive = :active', { active: 1 })
      .getMany() ;
    return permissions.map((data) => {
      return data.route;
    });
  }

}
