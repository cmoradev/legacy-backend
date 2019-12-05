import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SystemApplicationForms } from './entities/system-application-forms.entity';
import { SystemApplicationFormsService } from './system-application-forms.service';

@Crud({
  model: {
    type: SystemApplicationForms,
  },
  query: {
    join: {},
  },
})
@Controller()
export class SystemApplicationFormsController implements CrudController<SystemApplicationForms> {
  constructor(readonly service: SystemApplicationFormsService) {
  }

  get base(): CrudController<SystemApplicationForms> {
    return this;
  }
}
