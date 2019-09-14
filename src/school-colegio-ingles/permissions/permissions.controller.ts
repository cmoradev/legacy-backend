import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Permission } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';
import { PermissionDto } from './DTO/permission.dto';
import { Equal } from 'typeorm';

@Crud({
  model: {
    type: Permission,
  },
  query: {
    join: {
      role: {},
      route: {},
      parent: {},
      children: {},
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

  @Get('pruebas/:id')
  async getTreePermission(@Param('id') idrol: string) {
    return await this.service.repo.find({
      where: {
          role: {
            id: idrol,
          },
          route: {
            'name': 'Tienda',
          },
        },
      relations: ['route', 'role'],
    });
    /*return permissions.map((data) => {
      return data.route;
    });*/
  }

}
