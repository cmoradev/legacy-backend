import { Controller, UseGuards } from '@nestjs/common';
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
}
