import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Permission } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';

@Crud({
    model: {
        type: Permission,
    },
})
@Controller()
export class PermissionsController implements CrudController<Permission> {
    constructor(
        readonly service: PermissionsService,
    ) { }
    get base(): CrudController<Permission> {
        return this;
    }
}
