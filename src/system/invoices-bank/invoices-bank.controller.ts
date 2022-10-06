import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InvoicesBank } from './entities/invoices-bank.entity';
import { InvoicesBankService } from './invoices-bank.service';

@Crud({
  model: {
    type: InvoicesBank,
  },
  query: {
    limit: 10,
    join: {},
  },
})
@Controller()
export class InvoicesBankController implements CrudController<InvoicesBank> {
  constructor(
    readonly service: InvoicesBankService,
  ) {}
  get base(): CrudController<InvoicesBank> {
    return this;
  }
}
