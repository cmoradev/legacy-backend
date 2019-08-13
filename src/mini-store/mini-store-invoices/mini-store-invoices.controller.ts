import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';
import { MiniStoreInvoicesService } from './mini-store-invoices.service';

@Crud({
    model: {
        type: MiniStoreInvoice,
    },
    query: {
        join: {
            miniStoreSalePayment: {},
        },
    },
})
@Controller()
export class MiniStoreInvoicesController implements CrudController<MiniStoreInvoice> {
    constructor(
        readonly service: MiniStoreInvoicesService,
    ) {
    }

    get base(): CrudController<MiniStoreInvoice> {
        return this;
    }

}
