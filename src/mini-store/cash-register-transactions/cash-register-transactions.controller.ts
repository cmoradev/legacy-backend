import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CashRegisterTransaction } from './entities/cash-register-transaction.entity';
import { CashRegisterTransactionsService } from './cash-register-transactions.service';

@Crud({
    model: {
        type: CashRegisterTransaction,
    },
    query: {
        join: {
            agent: { exclude: ['password'] },
            cashRegister: {},
            payment: {},
            'payment.miniStoreSaleMethodPayments': {},
        },
    },
})
@Controller()
export class CashRegisterTransactionsController implements CrudController<CashRegisterTransaction> {
    constructor(public service: CashRegisterTransactionsService) {
    }

    get base(): CrudController<CashRegisterTransaction> {
        return this;
    }
}
