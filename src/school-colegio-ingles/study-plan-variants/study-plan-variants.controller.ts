import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { StudyPlanVariant } from './entities/study-plan-variants.entity';
import { StudyPlanVariantsService } from './study-plan-variants.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: StudyPlanVariant,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            studyPlan: {},
            assignmentSubjects: {},
        },
    },
})
@Controller()
export class StudyPlanVariantsController implements CrudController<StudyPlanVariant> {
    constructor(
        readonly service: StudyPlanVariantsService,
    ) {
    }

    get base(): CrudController<StudyPlanVariant> {
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
