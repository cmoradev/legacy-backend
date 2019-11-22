import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Grade } from './entities/grade.entity';
import { GradesService } from './grades.service';

@Crud({
  model: {
    type: Grade,
  },
  query: {
    join: {
      'level': {},
      'level.campus': {},
    },
  },
})
@Controller()
export class GradesController implements CrudController<Grade> {
  constructor(
    readonly service: GradesService,
  ) {
  }

  get base(): CrudController<Grade> {
    return this;
  }
}
