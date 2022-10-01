import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeMethodsPaymentsService } from './academy-charge-methods-payments.service';
import { AcademyChargeMethodsPayments } from './entities/academy-charge-methods-payments.entity';

@Crud({
    model: {
        type: AcademyChargeMethodsPayments,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {},
    },
})
@Controller()
export class AcademyChargeMethodsPaymentsController implements CrudController<AcademyChargeMethodsPayments> {
    constructor(
        readonly service: AcademyChargeMethodsPaymentsService,
    ) {
    }

    get base(): CrudController<AcademyChargeMethodsPayments> {
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
