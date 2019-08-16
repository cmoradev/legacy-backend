import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Group } from './entities/group.entity';
import { GroupsService } from './groups.service';

@Crud({
    model: {
        type: Group,
    },
    query: {
        join: {
            grade: {},
        },
    },
})
@Controller()
export class GroupsController implements CrudController<Group> {
    constructor(
        readonly service: GroupsService,
    ) {
    }

    get base(): CrudController<Group> {
        return this;
    }
}
