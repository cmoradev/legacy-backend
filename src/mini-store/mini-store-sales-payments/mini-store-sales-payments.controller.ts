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
        onlyFile?: boolean,
        invoiceStatus?: number,
    }) {

        const payments = await this.service.fetchFilteredPayments(query);
        const sales = await this.service.fetchFilteredSales(query);
        const salesReturns = await this.service.fetchFilteredReturns(query);
        const result = await this.service.simpleReport(payments, sales, salesReturns, { base64: true });
        response.status(200);
        response.send(query.onlyFile ? result : payments);
    }
}
