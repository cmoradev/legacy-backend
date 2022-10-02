import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PaymentPlanConcept } from './entities/payment-plan-concept.entity';
import { PaymentPlanConceptsService } from './payment-plan-concepts.service';

@Crud({
    model: {
        type: PaymentPlanConcept,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            paymentPlan: {eager: false},
            grades: {eager: false},
            schoolPayment: {eager: false},
        },
    },
})
@Controller()
export class PaymentPlanConceptsController implements CrudController<PaymentPlanConcept> {
    constructor(
        readonly service: PaymentPlanConceptsService,
    ) {
    }

    get base(): CrudController<PaymentPlanConcept> {
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
