import { Controller } from '@nestjs/common';
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
    constructor(
        readonly service: RolesService,
    ) { }
    get base(): CrudController<Role> {
        return this;
    }
}
