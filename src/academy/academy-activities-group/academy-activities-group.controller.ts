import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyActivitiesGroup } from './entities/academy-activities-group.entity';
import { AcademyActivitiesGroupService } from './academy-activities-group.service';

@Crud({
    model: {
        type: AcademyActivitiesGroup,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            academyGroupShift: {eager: false},
            academyGroupActivity: {eager: false},
            academyGroupCycle: {eager: false},
            academyGroupCampus: {eager: false},
        },
    },
})
@Controller()
export class AcademyActivitiesGroupController implements CrudController<AcademyActivitiesGroup> {
    constructor(
        readonly service: AcademyActivitiesGroupService,
    ) {
    }

    get base(): CrudController<AcademyActivitiesGroup> {
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
