import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SystemPaymentStatus } from './entities/system-payment-status.entity';
import { SystemPaymentsStatusService } from './system-payments-status.service';

@Crud({
    model: {
        type: SystemPaymentStatus,
    },
    query: {
        join: {
            miniStoreSalePayments: { },
            miniStoreSalePayment: { },
        },
    },
})
@Controller()
export class SystemPaymentsStatusController implements CrudController<SystemPaymentStatus> {
    constructor(readonly service: SystemPaymentsStatusService) { }
    get base(): CrudController<SystemPaymentStatus> {
        return this;
    }
}
