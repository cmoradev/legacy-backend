import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyActivity } from './entities/academy-activity.entity';
import { AcademyActivitiesService } from './academy-activities.service';

@Crud({
  model: {
    type: AcademyActivity,
  },
  query: {
    limit: 200,
    join: {},
  },
})
@Controller()
export class AcademyActivitiesController implements CrudController<AcademyActivity> {
  constructor(
    readonly service: AcademyActivitiesService,
  ) {
  }

  get base(): CrudController<AcademyActivity> {
    return this;
  }
}
