import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';

@Crud({
    model: {
        type: MiniStoreSalePayment,
    },
    query: {
        join: {
            miniStoreSale: {},
            SystemPaymentStatus: {},
            miniStoreSaleMethodPayments: {},
            miniStoreInvoices: {},
        },
    },
})
@Controller()
export class MiniStoreSalesPaymentsController implements CrudController<MiniStoreSalePayment> {
    constructor(
        readonly service: MiniStoreSalesPaymentsService,
    ) {
    }

    get base(): CrudController<MiniStoreSalePayment> {
        return this;
    }

    @Get('/simple-report')
    async simpleReport(@Req() request, @Res() response, @Query() query: {
        status: number,
        startDate: Date,
        endDate: Date,
        cashier?: number,
    }) {

        const result = await this.service.simpleReport();
        const sa = await this.service.fetchFilteredPayments(query);
        response.status(200);
        response.send(sa);
    }
}
