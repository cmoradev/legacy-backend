import {Controller, Delete, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Periods } from './entities/periods.entity';
import { PeriodsService } from './periods.service';

@Crud({
    model: {
        type: Periods,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            periodsCycle: {eager: false},
        },
    },
})
@Controller()
export class PeriodsController implements CrudController<Periods> {
    constructor(readonly service: PeriodsService) {
    }

    get base(): CrudController<Periods> {
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
