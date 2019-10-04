import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { BranchCompany } from './entities/branch-company.entity';
import { BranchCompanyService } from './branch-company.service';

@Crud({
    model: {
        type: BranchCompany,
    },
})
@Controller()
export class BranchCompanyController implements CrudController<BranchCompany> {
    constructor(public service: BranchCompanyService) {
    }

}
