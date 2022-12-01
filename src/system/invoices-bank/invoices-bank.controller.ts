import {Controller, Delete, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InvoicesBank } from './entities/invoices-bank.entity';
import { InvoicesBankService } from './invoices-bank.service';

@Crud({
  model: {
    type: InvoicesBank,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null,
      },
    },
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

  @Delete('soft-deleted/:id')
  public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }

  @Put('soft-restore/:id')
  public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softRestoreOne(id);
  }
}
