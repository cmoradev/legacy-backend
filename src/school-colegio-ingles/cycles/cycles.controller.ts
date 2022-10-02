import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Cycle } from './entities/cycle.entity';
import { CyclesService } from './cycles.service';

@Crud({
    model: {
        type: Cycle,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
    },
})
@Controller()
export class CyclesController implements CrudController<Cycle> {
    constructor(readonly service: CyclesService) {
    }

    get base(): CrudController<Cycle> {
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
