import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InvoiceKeys } from './entities/invoice-keys.entity';
import { InvoiceKeysService } from './invoice-keys.service';

@Crud({
  model: {
    type: InvoiceKeys,
  },
})
@Controller()
export class InvoiceKeysController implements CrudController<InvoiceKeys> {
  constructor(
    readonly service: InvoiceKeysService,
  ) {
  }

  get base(): CrudController<InvoiceKeys> {
    return this;
  }
}
