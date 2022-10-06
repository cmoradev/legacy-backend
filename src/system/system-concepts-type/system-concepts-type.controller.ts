import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SystemConceptsType } from './entities/system-concepts-type.entity';
import { SystemConceptsTypeService } from './system-concepts-type.service';

@Crud({
  model: {
    type: SystemConceptsType,
  },
  query: {
    limit: 10,
    join: {},
  },
})
@Controller()
export class SystemConceptsTypeController implements CrudController<SystemConceptsType> {
  constructor(readonly service: SystemConceptsTypeService) { }
  get base(): CrudController<SystemConceptsType> {
    return this;
  }
}
