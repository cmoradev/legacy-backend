import {Controller, Delete, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { BranchOffice } from './entities/branch-office.entity';
import { BranchOfficeService } from './branch-office.service';

@Crud({
    model: {
        type: BranchOffice,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            branchoffice: {eager: false},
            'branchoffice.quickSaleMethod': {eager: false},
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
