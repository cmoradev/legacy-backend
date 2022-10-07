import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';

@Crud({
    model: {
        type: Transaction,
    },
    query: {
        limit: 10,
        join: {
            student: {eager: false},
            sale: {eager: false},
        },
    }
})
@Controller()
export class TransactionController implements CrudController<Transaction> {
    constructor(readonly service: TransactionService) { }
    get base(): CrudController<Transaction> {
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

