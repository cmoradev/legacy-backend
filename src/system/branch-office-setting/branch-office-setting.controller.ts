import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { BranchOfficeSetting } from './entities/branch-office-setting.entity';
import { BranchOfficeSettingService } from './branch-office-setting.service';

@Crud({
    model: {
        type: BranchOfficeSetting,
    },
    query: {
        join: { invoiceCampus: {} },
    },
})
@Controller()
export class BranchOfficeSettingController implements CrudController<BranchOfficeSetting> {
    constructor(
        readonly service: BranchOfficeSettingService,
    ) {
    }

    get base(): CrudController<BranchOfficeSetting> {
        return this;
    }
}
