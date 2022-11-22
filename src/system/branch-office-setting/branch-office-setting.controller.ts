import {Controller, Delete, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { BranchOfficeSetting } from './entities/branch-office-setting.entity';
import { BranchOfficeSettingService } from './branch-office-setting.service';

@Crud({
    model: {
        type: BranchOfficeSetting,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            invoiceCampus: {eager: false},
            quickSaleMethod: {eager: false},
        },
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
