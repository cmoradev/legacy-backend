import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeMethodsPaymentsService } from './academy-charge-methods-payments.service';
import { AcademyChargeMethodsPayments } from './entities/academy-charge-methods-payments.entity';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
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
        limit: 200,
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
