import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@Crud({
    model: {
        type: Role,
    },
})
@Controller()
export class RolesController implements CrudController<Role> {
    constructor(readonly service: RolesService) { }
    get base(): CrudController<Role> {
        return this;
    }

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
