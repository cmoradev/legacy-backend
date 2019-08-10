import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { StudyPlan } from './entities/study-plan.entity';
import { StudyPlansService } from './study-plans.service';
import { Subject } from '../subjects/entities/subject.entity';

@Crud({
    model: {
        type: StudyPlan,
    },
})
@Controller()
export class StudyPlansController implements CrudController<StudyPlan> {
    constructor(readonly service: StudyPlansService) { }

    get base(): CrudController<StudyPlan> {
        return this;
    }
}
