import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SystemExtraCharges } from './entities/system-extra-charges.entity';
import { SystemExtraChargesService } from './system-extra-charges.service';

@Crud({
  model: {
    type: SystemExtraCharges,
  },
  query: {
    join: {},
  },
})
@Controller()
export class SystemExtraChargesController implements CrudController<SystemExtraCharges> {
  constructor(readonly service: SystemExtraChargesService) {
  }

  get base(): CrudController<SystemExtraCharges> {
    return this;
  }
}
