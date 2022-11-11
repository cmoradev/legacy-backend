import {Controller, Delete, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargesMethodsPayments } from './entities/school-charges-methods-payments.entity';
import { SchoolChargesMethodsPaymentsService } from './school-charges-methods-payments.service';

@Crud({
    model: {
        type: SchoolChargesMethodsPayments,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            Bank: {eager: false},
            invoiceMethodPayment: {eager: false},
            schoolChargePayment: {eager: false},
        },
    },
})
@Controller()
export class SchoolChargesMethodsPaymentsController implements CrudController<SchoolChargesMethodsPayments> {
    constructor(
        readonly service: SchoolChargesMethodsPaymentsService,
    ) {
    }

    get base(): CrudController<SchoolChargesMethodsPayments> {
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
