import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeInvoice } from './entities/academy-charge-invoice.entity';
import { AcademyChargeInvoiceService } from './academy-charge-invoice.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
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
