import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CashRegisterTransaction } from './entities/cash-register-transaction.entity';
import { CashRegisterTransactionsService } from './cash-register-transactions.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
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
            cashRegister: {},
            payment: {},
            'payment.miniStoreSaleMethodPayments': {
                alias: 'paymentMiniStoreSaleMethodPayments',
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
