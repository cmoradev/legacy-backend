import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { BranchCompany } from './entities/branch-company.entity';
import { BranchCompaniesService } from './branch-companies.service';

@Crud({
    model: {
        type: BranchCompany,
    },
    query: {
        limit: 10,
        join: {
            matrixCompany: {
                exclude: ['createdAt', 'updatedAt'],
                eager: false
            },
            employees: {eager: false},
            fixedAssets: {eager: false},
        },
    },
})
@Controller()
export class BranchCompaniesController
    implements CrudController<BranchCompany> {
    constructor(public service: BranchCompaniesService) {
    }
}
