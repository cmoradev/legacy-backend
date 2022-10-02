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
            studyPlan: {eager: false},
            'studyPlan.level': {eager: false},
            grades: {eager: false},
            level: {eager: false},
            paymentPlanConcepts: {eager: false},
            'level.campus': {eager: false},
            studentsInscriptions: {eager: false},
            schoolCharges: {eager: false},
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
