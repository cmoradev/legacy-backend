import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { StudyPlan } from './entities/study-plan.entity';
import { StudyPlansService } from './study-plans.service';

@Crud({
    model: {
        type: StudyPlan,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            modality: {eager: false},
            group: {eager: false},
            level: {eager: false},
            studyPlansVariants: {eager: false},
            classrooms: {eager: false},
        },
    },
})
@Controller()
export class StudyPlansController implements CrudController<StudyPlan> {
    constructor(readonly service: StudyPlansService) {
    }

    get base(): CrudController<StudyPlan> {
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
