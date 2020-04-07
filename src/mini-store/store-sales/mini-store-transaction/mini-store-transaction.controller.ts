import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreTransaction } from './entities/mini-store-transaction.entity';
import { MiniStoreTransactionService } from './mini-store-transaction.service';

@Crud({
    model: {
        type: MiniStoreTransaction,
    },
    query: {
        join: {
            transactionUser: {},
        },
    },
})
@Controller()
export class MiniStoreTransactionController implements CrudController<MiniStoreTransaction> {
    constructor(public service: MiniStoreTransactionService) {
    }

    get base(): CrudController<MiniStoreTransaction> {
        return this;
    }
}
