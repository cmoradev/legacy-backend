import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CashRegister } from './entities/cash-register.entity';
import { CashRegisterService } from './cash-register.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
import { ReportsCashQuery } from './types/reports.type';
import { Response } from 'express';
import { TransactionsReport } from './reports/transactions';

//@UseGuards(JwtGuard)
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
                alias: 'transactions_payment',
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

    @Get('/cash-report')
    async reportTransactions(@Query() query: ReportsCashQuery, @Req() req, @Res() res: Response) {
        const re = new TransactionsReport();
        const download = Buffer.from(await re.getDocument(), 'base64');
        res.contentType('application/pdf');
        res.send(download);
    }
}
