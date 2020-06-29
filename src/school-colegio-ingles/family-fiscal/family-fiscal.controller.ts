import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { BusinessNameFamily } from './entities/BusinessNameFamily.entity';
import { FamilyFiscalService } from './family-fiscal.service';

@Crud({
    model: {
        type: BusinessNameFamily,
    },
    query: {
        join: {
            family: {},
        },
    },
})
@Controller()
export class FamilyFiscalController implements CrudController<BusinessNameFamily> {
    constructor(
        readonly service: FamilyFiscalService,
    ) {
    }

    get base(): CrudController<BusinessNameFamily> {
        return this;
    }
}
