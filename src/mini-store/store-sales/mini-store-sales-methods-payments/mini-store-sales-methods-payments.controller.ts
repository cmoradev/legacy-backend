import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSaleMethodPayment } from './entities/mini-store-sale-method-payment.entity';
import { MiniStoreSalesMethodsPaymentsService } from './mini-store-sales-methods-payments.service';

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
        limit: 10,
        join: {
            invoiceMethodPayment: {eager: false},
            miniStoreSalePayment: {eager: false},
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
