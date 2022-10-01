import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InvoiceMethodPayment } from './entities/invoice-method-payment.entity';
import { InvoiceMethodsPaymentsService } from './invoice-methods-payments.service';

@Crud({
    model: {
        type: InvoiceMethodPayment,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            miniStoreSaleMethodPayments: {eager: false},
        },
    },
})
@Controller()
export class InvoiceMethodsPaymentsController implements CrudController<InvoiceMethodPayment> {
    constructor(
        readonly service: InvoiceMethodsPaymentsService,
    ) {
    }

    get base(): CrudController<InvoiceMethodPayment> {
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
