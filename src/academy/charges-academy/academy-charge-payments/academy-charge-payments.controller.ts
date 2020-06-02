import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargePaymentsService } from './academy-charge-payments.service';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { AcademyCharge } from '../academy-charge/entities/academy-charge.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { PaymentStatus } from '../../../common/enums/PaymentStatus';
import { AcademyChargeMethodsPayments } from '../academy-charge-methods-payments/entities/academy-charge-methods-payments.entity';
import { User } from '../../../system/users/entities/user.entity';
import { AcademyChargeInvoice } from '../academy-charge-invoice/entities/academy-charge-invoice.entity';
import { QuerySimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { convertPaymentsReport } from '../../../mini-store/store-sales/mini-store-sales-payments/reports/payments.util';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { convertPaymentsReportAc } from './reports/payments.util';

@Crud({
    model: {
        type: AcademyChargePayments,
    },
    query: {
        limit: 200,
        join: {
            academyCharge: {},
            'academyCharge.chargesDetails': {},
            'academyCharge.chargesDetails.extraCharges': {},
            academyPaymentOffice: {},
            academyPaymentOfficeSet: {},
            methodsPayments: {},
            cashierCharge: {},
            cashierChargeCancellation: {},
            academyChargesInvoice: {},
        },
    },
})
@Controller()
export class AcademyChargePaymentsController implements CrudController<AcademyChargePayments> {
    constructor(
        readonly service: AcademyChargePaymentsService,
        readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
    ) {
    }

    get base(): CrudController<AcademyChargePayments> {
        return this;
    }

    @Get('/simple-report')
    async simpleReport(@Req() request, @Res() response, @Query() query: QuerySimpleReport) {
        const payments = await this.service.fetchFilteredPayments(query);
        const charges = await this.service.fetchFilteredSales(query);
        const result = {
            payments: {
                matriz: [],
                payments: [],
            },
            sales: [],
            returns: [],
            file: '',
        };

        if (query.onlyFile) {
             result.file = await this.service.simpleReport(payments, charges, { base64: true });
        } else {
            const cashiers = await this.service.getUserCasher();
            const paymenMethods = await this.invoiceMethodsPaymentsService.repo.find({
                where: {
                    showReport: true,
                    isActive: true,
                },
            });

            const viewPayments = convertPaymentsReportAc(payments, cashiers, paymenMethods);
            result.payments = viewPayments;
        }

        response.send(result);
    }
}
