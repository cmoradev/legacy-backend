import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolPayment } from './entities/school-payment.entity';
import { SchoolPaymentsService } from './school-payments.service';

@Crud({
  model: {
    type: SchoolPayment,
  },
  query: {
    join: {
      schoolChargeDetail: {},
      'schoolChargeDetail.extraCharges': {},
      inscription: {},
      extraCharges: {alias: 'schoolExtraCharges'},
    },
  },
})
@Controller()
export class SchoolPaymentsController implements CrudController<SchoolPayment> {
  constructor(
    readonly service: SchoolPaymentsService,
  ) { }
  get base(): CrudController<SchoolPayment> {
    return this;
  }

}
