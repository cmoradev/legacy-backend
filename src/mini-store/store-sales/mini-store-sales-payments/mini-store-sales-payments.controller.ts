import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { convertPaymentsReport } from './reports/payments.util';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { QueryBilling, QuerySimpleReport } from './interface/InvoiceMiniStore.interface';
import { ConceptsPriceByPaymentBillig } from '../../../common/point-of-sale/miniStore-point-of-sale';
import { CFDI, Comprobante, Concepts, Emisor, Impuestos, Receptor } from '@signati/core';
import { XmlConceptoAttributes } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import { mulQuantity, subQuantity, sumQuantity } from '../../../common/point-of-sale/point-of-sale';
import { FactSw } from '../../../webService/FactSw';

import { FactMod } from '../../../webService/factMod';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
import { GenerateInvoice } from './utils/generateInvoice';
import { MiniStoreInvoice } from '../mini-store-invoices/entities/mini-store-invoice.entity';
import { MiniStoreInvoicesService } from '../mini-store-invoices/mini-store-invoices.service';
import { User } from '../../../system/users/entities/user.entity';
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStoreSalePayment,
    },
    query: {
        limit: 200,
        join: {
            agent: {},
            miniStoreSaleMethodPayments: {},
            'miniStoreSaleMethodPayments.invoiceMethodPayment': {},
            miniStoreInvoices: {},
            miniStoreSale: {},
        },
    },
})
@Controller()
export class MiniStoreSalesPaymentsController implements CrudController<MiniStoreSalePayment> {
    constructor(
        readonly service: MiniStoreSalesPaymentsService,
        readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
        readonly miniStoreInvoicesService: MiniStoreInvoicesService,
    ) {
    }

    get base(): CrudController<MiniStoreSalePayment> {
        return this;
    }

    @Get('/simple-report')
    async simpleReport(@Req() request, @Res() response, @Query() query: QuerySimpleReport) {

        const payments = await this.service.fetchFilteredPayments(query);
        const sales = await this.service.fetchFilteredSales(query);
        const salesReturns = await this.service.fetchFilteredReturns(query);
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
            result.file = await this.service.simpleReport(payments, sales, salesReturns, { base64: true });
        } else {
            const cashiers = await this.service.getUserCasher();
            const paymenMethods = await this.invoiceMethodsPaymentsService.repo.find({
                where: {
                    showReport: true,
                    isActive: true,
                },
            });
            const viewPayments = convertPaymentsReport(payments, cashiers, paymenMethods);
            result.payments = viewPayments;
        }
        response.send(result);
        //
        // response.status(200);
        // response.send(query.onlyFile ? result : payments);
    }

    @Get('billing')
    async billing(@Req() request, @Res() response, @Query() query: QueryBilling) {
        const sw = new FactSw();

        const result = await this.service.findSaleByPayment(query);
        const invoiceDetails = ConceptsPriceByPaymentBillig(result.payment, result.sale.miniStoreSaleDetails);


        try {
            if (false) {

            } else {
                const factura = new MiniStoreInvoice();
                factura.uuid = '';
                factura.businessName = '';
                factura.rfc = '';
                factura.agentBilling = {
                    id: 0,
                } as User;
                factura.status = 0; // Pendiente de procesar en facturación moderna
                factura.miniStoreSale = {
                    id: query.saleId,
                } as MiniStoreSale;
                factura.miniStoreSalePayment = {
                    id: query.salePaymentId,
                } as MiniStoreSalePayment;
                factura.idPlantel = 1;
                const invoice = await this.miniStoreInvoicesService.saveInvoice(factura);
                if (invoice) {
                    const xml = await GenerateInvoice({
                            folio: invoice.folio,
                            serie: 'E',
                        }, {} as BranchOfficeSetting, {
                            Nombre: query.receiver.businessName,
                            Rfc: query.receiver.rfc,
                            UsoCFDI: query.usoCfdi.value,
                        },
                        invoiceDetails);
                }
            }


            // console.log(await sw.getToken());
            // const timbrado = await sw.facturar(xml);
            // console.log(timbrado);
            // response.set('Content-Type', 'text/xml');
            // response.send(xml);

        } catch (e) {
            console.log(e);
            response.send(e);
        }
    }
}
