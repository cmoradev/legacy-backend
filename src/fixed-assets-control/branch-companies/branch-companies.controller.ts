import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { BranchCompany } from './entities/branch-company.entity';
import { BranchCompaniesService } from './branch-companies.service';

@Crud({
    model: {
        type: BranchCompany,
    },
})
@Controller()
export class BranchCompaniesController implements CrudController<BranchCompany> {
    constructor(public service: BranchCompaniesService) {
    }

}
