import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreTransaction } from './entities/mini-store-transaction.entity';
import { MiniStoreTransactionService } from './mini-store-transaction.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@Crud({
    model: {
        type: MiniStoreTransaction,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
