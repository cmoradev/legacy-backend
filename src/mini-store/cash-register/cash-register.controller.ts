import { Controller, Delete, Get, Param, ParseIntPipe, Put, Query, Req, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CashRegister } from './entities/cash-register.entity';
import { CashRegisterService } from './cash-register.service';
import { ReportsCashQuery } from './types/reports.type';
import { Response } from 'express';
import { TransactionsReport } from './reports/transactions';
import { transactionsList } from './reports/transactions.report';
@Crud({
    model: {
        type: CashRegister,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            agent: { eager:false, exclude: ['password'] },
            transactions: {eager: false},
            'transactions.agent': {
                alias: 'transactions_agent',
                eager: false
            },
            'transactions.payment': {
                alias: 'transactions_payment',
                eager: false
            },
            'transactions.payment.miniStoreSaleMethodPayments': {
                alias: 'paymentMiniStoreSaleMethodPayments',
                eager: false
            },
            movements: {eager: false},
        },
    },
})
@Controller()
export class CashRegisterController implements CrudController<CashRegister> {
    constructor(public service: CashRegisterService) {
    }

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
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
            await re.finalAmount(tra.finalAmount);
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
