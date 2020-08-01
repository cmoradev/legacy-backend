import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CashRegister } from './entities/cash-register.entity';
import { CashRegisterService } from './cash-register.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: CashRegister,
    },
    query: {
        join: {
            agent: { exclude: ['password'] },
            transactions: {},
            'transactions.agent': {
                alias: 'transactions_agent',
            },
            'transactions.payment': {
                alias: 'transactions_payment'
            },
            'transactions.payment.miniStoreSaleMethodPayments': {
                alias: 'paymentMiniStoreSaleMethodPayments',
            },
            movements: {},
        },
    },
})
@Controller()
export class CashRegisterController implements CrudController<CashRegister> {
    constructor(public service: CashRegisterService) {
    }
}
