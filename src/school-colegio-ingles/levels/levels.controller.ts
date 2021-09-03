import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Level } from './entities/level.entity';
import { LevelsService } from './levels.service';

@Crud({
    model: {
        type: Level,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            grades: {},
            campus: {},
            paymentPlans: {},
            'paymentPlans.paymentConcepts': {},
            levelInscriptions: {},
            classrooms: {},
        },
    },
})
@Controller()
export class LevelsController implements CrudController<Level> {
    constructor(readonly service: LevelsService) {
    }

    get base(): CrudController<Level> {
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
