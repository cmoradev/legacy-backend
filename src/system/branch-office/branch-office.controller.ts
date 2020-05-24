import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { BranchOffice } from './entities/branch-office.entity';
import { BranchOfficeService } from './branch-office.service';

@Crud({
    model: {
        type: BranchOffice,
    },
    query: {
        join: {
            branchoffice: {},
            'branchoffice.quickSaleMethod': {},
        },
    },
})
@Controller()
export class BranchOfficeController implements CrudController<BranchOffice> {
    constructor(
        readonly service: BranchOfficeService,
    ) {
    }

    get base(): CrudController<BranchOffice> {
        return this;
    }
}
