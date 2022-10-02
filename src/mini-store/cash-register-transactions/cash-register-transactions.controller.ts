import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CashRegisterTransaction } from './entities/cash-register-transaction.entity';
import { CashRegisterTransactionsService } from './cash-register-transactions.service';

@Crud({
    model: {
        type: CashRegisterTransaction,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            agent: { exclude: ['password'] },
            cashRegister: {eager: false},
            payment: {eager: false},
            'payment.miniStoreSaleMethodPayments': {
                alias: 'paymentMiniStoreSaleMethodPayments',
                eager: false
            },
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
