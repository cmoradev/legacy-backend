import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSaleMethodPayment } from './entities/mini-store-sale-method-payment.entity';
import { MiniStoreSalesMethodsPaymentsService } from './mini-store-sales-methods-payments.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@Crud({
    model: {
        type: MiniStoreSaleMethodPayment,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            invoiceMethodPayment: {},
            miniStoreSalePayment: {},
        },
    },
})
@Controller()
export class MiniStoreSalesMethodsPaymentsController implements CrudController<MiniStoreSaleMethodPayment> {
    constructor(
        readonly service: MiniStoreSalesMethodsPaymentsService,
    ) {
    }

    get base(): CrudController<MiniStoreSaleMethodPayment> {
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
