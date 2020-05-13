import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InvoiceCompany } from './entities/invoice-company.entity';
import { InvoiceCompanyService } from './invoice-company.service';

@Crud({
  model: {
    type: InvoiceCompany,
  },
    query: {
      join: { invoiceCampus: {} }
    }
})
@Controller()
export class InvoiceCompanyController implements CrudController<InvoiceCompany> {
  constructor(
    readonly service: InvoiceCompanyService,
  ) {
  }

  get base(): CrudController<InvoiceCompany> {
    return this;
  }
}
