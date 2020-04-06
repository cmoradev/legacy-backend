import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CashRegister } from './entities/cash-register.entity';
import { CashRegisterService } from './cash-register.service';

@Crud({
    model: {
        type: CashRegister,
    },
    query: {
        join: {
            agent: { exclude: ['password'] },
            transactions: {},
            movements: {},
            payment: {},
        },
    },
})
@Controller()
export class CashRegisterController implements CrudController<CashRegister> {
    constructor(public service: CashRegisterService) {
    }
}
