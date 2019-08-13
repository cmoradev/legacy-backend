import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStorePaymentStatus } from './entities/mini-store-payment-status.entity';
import { MiniStorePaymentsStatusService } from './mini-store-payments-status.service';

@Crud({
    model: {
        type: MiniStorePaymentStatus,
    },
    query: {
        join: {
            miniStoreSalePayments: { },
            miniStoreSalePayment: { },
        },
    },
})
@Controller()
export class MiniStorePaymentsStatusController implements CrudController<MiniStorePaymentStatus> {
    constructor(readonly service: MiniStorePaymentsStatusService) { }
    get base(): CrudController<MiniStorePaymentStatus> {
        return this;
    }
}
