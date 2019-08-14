import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Crud({
    model: {
        type: User,
    },
})
@Controller()
export class UsersController implements CrudController<User> {
    constructor(
        readonly service: UsersService,
    ) { }
    get base(): CrudController<User> {
        return this;
    }
}
