import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargePaymentsService } from './academy-charge-payments.service';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';
import {
    QueryBilling,
    QuerySimpleReport,
} from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { convertPaymentsReportAc } from './reports/payments.util';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
import { QueryBillingAcademy } from './types/InvoiceAcademy.interface';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { MiniStoreInvoicesService } from '../../../mini-store/store-sales/mini-store-invoices/mini-store-invoices.service';
import { AcademyChargeInvoiceService } from '../academy-charge-invoice/academy-charge-invoice.service';
import { FactSw } from '../../../webService/FactSw';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { ConceptsPriceByPaymentBillig } from '../../../common/point-of-sale/miniStore-point-of-sale';
import { ConceptsPriceByPaymentBilligAS } from '../../../common/point-of-sale/school-academy-point-of-sale';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: AcademyChargePayments,
    },
    query: {
        limit: 200,
        join: {
            academyCharge: {},
            'academyCharge.chargesDetails': {},
            'academyCharge.schoolStudent': {},
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
        readonly academyChargeInvoiceService: AcademyChargeInvoiceService,
        readonly branchOffice: BranchOfficeService,
        readonly branchOfficeSettingService: BranchOfficeSettingService,
        private  smartWeb: FactSw,
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

    @Get('/time-change')
    async timeChange(@Req() request, @Res() response) {
        // await this.service.changeTime();
        response.send({ msj: 'finalizado' });
    }

    @Post('/billing')
    async billing(@Body() query: QueryBillingAcademy, @Res() res: Response) {
        const result = await this.service.findSaleByPayment(query);
        const invoiceDetails = ConceptsPriceByPaymentBilligAS(result.payment, result.charge.chargesDetails);
        res.send(invoiceDetails);
        const currentOffice = await this.branchOffice.findBranch(query.branchOfficeId);
        const branchOfficeSett = await this.branchOfficeSettingService.findOne({
            where: {
                id: query.branchOfficeSettingId,
            },
        });
        const invoiceFind = await this.academyChargeInvoiceService.findInvoiceByPayment({
            paymentId: query.chargePaymentId,
            status: StatusInvoce.noBilling,
        });

        const respuesta = {
            stamping: false,
            msg: '',
            invoice: {},
            uuid: '',
        };

        try {
            if (invoiceFind) {
                if (invoiceFind.academyChargePayment.stamping === 1) {
                    const invocePayment = await this.academyChargeInvoiceService.findInvoiceByPayment({
                        paymentId: query.chargePaymentId,
                        status: StatusInvoce.invoiced,
                        stamping: 1,
                    });
                    respuesta.stamping = true;
                    respuesta.invoice = invocePayment;
                    respuesta.msg = 'Pago Facturado';
                    respuesta.uuid = invocePayment.uuid;
                    res.send(respuesta);
                } else {

                }
            } else {

            }
        } catch (e) {
            res.send(e);
        }

    }
}
