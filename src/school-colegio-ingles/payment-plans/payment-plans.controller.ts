import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PaymentPlan } from './entities/payment-plan.entity';
import { PaymentPlansService } from './payment-plans.service';

@Crud({
    model: {
        type: PaymentPlan,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            studyPlan: {},
            'studyPlan.level': {},
            grades: {},
            level: {},
            paymentPlanConcepts: {},
            'level.campus': {},
            studentsInscriptions: {},
            schoolCharges: {},
        },
    },
})
@Controller()
export class PaymentPlansController implements CrudController<PaymentPlan> {
    constructor(readonly service: PaymentPlansService) {
    }

    get base(): CrudController<PaymentPlan> {
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
