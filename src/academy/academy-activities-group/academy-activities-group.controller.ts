import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyActivitiesGroup } from './entities/academy-activities-group.entity';
import { AcademyActivitiesGroupService } from './academy-activities-group.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: AcademyActivitiesGroup,
    },
    query: {
        limit: 200,
        join: {
            academyGroupShift: {},
            academyGroupActivity: {},
            academyGroupCycle: {},
            academyGroupCampus: {},
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
}
