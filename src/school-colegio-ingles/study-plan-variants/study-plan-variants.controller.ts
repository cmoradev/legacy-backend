import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { StudyPlanVariant } from './entities/study-plan-variants.entity';
import { StudyPlanVariantsService } from './study-plan-variants.service';
import { StudyPlan } from '../study-plans/entities/study-plan.entity';

@Crud({
    model: {
        type: StudyPlanVariant,
    },
})
@Controller()
export class StudyPlanVariantsController implements CrudController<StudyPlanVariant> {
    constructor(
        readonly service: StudyPlanVariantsService,
    ) { }
    get base(): CrudController<StudyPlanVariant> {
        return this;
    }
}
