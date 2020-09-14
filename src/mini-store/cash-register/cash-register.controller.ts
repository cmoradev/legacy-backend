import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CashRegister } from './entities/cash-register.entity';
import { CashRegisterService } from './cash-register.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
import { ReportsCashQuery } from './types/reports.type';
import { Response } from 'express';
import { TransactionsReport } from './reports/transactions';
import { transactionsList } from './reports/transactions.report';

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
        try {

            const tra = transactionsList(await this.service.generateDataReport(query));
            const re = new TransactionsReport();
            await re.addRow(tra.data);
            await re.addBoxSmall(tra.box);
            await re.addIncome(tra.income);
            await re.addMoneyOut(tra.moneyOut);
            await re.addSubIncomeMoneyOut(tra.subIncomeMoneyOut);
            await re.addTotal(tra.total);
            res.send({
                src: 'data:application/pdf;base64,' + await re.getDocument(),
            });
            // const download = Buffer.from(await re.getDocument(), 'base64');
            // res.contentType('application/pdf');
            // res.send(download);
            // res.send({
            //     src: 'data:application/pdf;base64,' + await re.getDocument(),
            // });
        } catch (e) {
            res.send({ error: e }).status(400);
        }
    }
}
