import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Family } from './entities/family.entity';
import { FamiliesService } from './families.service';
@Crud({
    model: {
        type: Family,
    },
})
@Controller()
export class FamiliesController implements CrudController<Family> {
    constructor(
        readonly service: FamiliesService,
    ) { }
    get base(): CrudController<Family> {
        return this;
    }
}
