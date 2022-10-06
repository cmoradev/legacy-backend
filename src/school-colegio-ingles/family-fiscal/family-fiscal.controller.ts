import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { BusinessNameFamily } from './entities/BusinessNameFamily.entity';
import { FamilyFiscalService } from './family-fiscal.service';

@Crud({
    model: {
        type: BusinessNameFamily,
    },
    query: {
        limit: 10,
        join: {
            family: {eager: false},
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
