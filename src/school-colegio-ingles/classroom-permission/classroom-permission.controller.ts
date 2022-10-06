import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ClassroomPermission } from './entities/classroom-permission.entity';
import { ClassroomPermissionService } from './classroom-permission.service';

@Crud({
    model: {
        type: ClassroomPermission,
    },
    query: {
        limit: 10,
        join: {
            classroom: {eager: false},
            user: {
                eager: false,
                exclude: ['password', 'rememberToken'],
            },
        },
    },
})
@Controller()
export class ClassroomPermissionController implements CrudController<ClassroomPermission> {
    constructor(
        readonly service: ClassroomPermissionService,
    ) {
    }
}
