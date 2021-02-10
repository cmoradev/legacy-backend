import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { StudyPlan } from './entities/study-plan.entity';
import { StudyPlansService } from './study-plans.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
  model: {
    type: StudyPlan,
  },
  query: {
    join: {
      modality: {},
      group: {},
      level: {},
      studyPlansVariants: {},
    },
  },
})
@Controller()
export class StudyPlansController implements CrudController<StudyPlan> {
  constructor(readonly service: StudyPlansService) {}

  get base(): CrudController<StudyPlan> {
    return this;
  }
}
