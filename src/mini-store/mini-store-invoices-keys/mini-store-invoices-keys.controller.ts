import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreInvoiceKey } from './entities/mini-store-invoice-key.entity';
import { MiniStoreInvoicesKeysService } from './mini-store-invoices-keys.service';

@Crud({
    model: {
        type: MiniStoreInvoiceKey,
    },
    query: {
        join: {
            storeProducts: {},
        },
    },
})
@Controller()
export class MiniStoreInvoicesKeysController implements CrudController<MiniStoreInvoiceKey> {
    constructor(
        readonly service: MiniStoreInvoicesKeysService,
    ) {
    }

    get base(): CrudController<MiniStoreInvoiceKey> {
        return this;
    }
}
