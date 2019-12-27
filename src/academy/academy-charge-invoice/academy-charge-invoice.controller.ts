import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeInvoice } from './entities/academy-charge-invoice.entity';
import { AcademyChargeInvoiceService } from './academy-charge-invoice.service';

@Crud({
  model: {
    type: AcademyChargeInvoice,
  },
  query: {
    limit: 200,
    join: {},
  },
})
@Controller()
export class AcademyChargeInvoiceController implements CrudController<AcademyChargeInvoice> {
  constructor(
    readonly service: AcademyChargeInvoiceService,
  ) {
  }

  get base(): CrudController<AcademyChargeInvoice> {
    return this;
  }
}
