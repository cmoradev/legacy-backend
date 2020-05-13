import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Campus } from './entities/campus.entity';
import { CampusesService } from './campuses.service';

@Crud({
    model: {
        type: Campus,
    },
    query: {
        join: {
            branchoffice: {},
        },
    },
})
@Controller()
export class CampusesController implements CrudController<Campus> {
    constructor(
        readonly service: CampusesService,
    ) { }
    get base(): CrudController<Campus> {
        return this;
    }
}
