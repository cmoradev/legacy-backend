import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { convertPaymentsReport } from './reports/payments.util';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { QueryBilling, QuerySimpleReport } from './interface/InvoiceMiniStore.interface';
import { ConceptsPriceByPaymentBillig } from '../../../common/point-of-sale/miniStore-point-of-sale';
import { FactSw } from '../../../webService/FactSw';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
import { GenerateInvoice } from './utils/generateInvoice';
import { MiniStoreInvoice } from '../mini-store-invoices/entities/mini-store-invoice.entity';
import { MiniStoreInvoicesService } from '../mini-store-invoices/mini-store-invoices.service';
import { User } from '../../../system/users/entities/user.entity';
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { PDF, XmlToJson } from '@signati/pdf';
import * as fs from 'fs';
import { XmlCdfi } from '@signati/core';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';

// @UseGuards(JwtGuard)
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
        readonly branchOfficeSettingService: BranchOfficeSettingService,
    ) {
    }

    get base(): CrudController<MiniStoreSalePayment> {
        return this;
    }

    @Get('/amir')
    async test() {
        const xml = '/home/misael/Documents/misproyectos/signati/Node/pdf/server/amir.xml';
        const pdf = new PDF(xml, 0, {
            lugarExpedicion: 'CARRETERA FEDERAL CANCUN TULUM KM 292 MANZANA 24 LOTE 24 FRACCION 4 EJIDO PLAYA',
        });
        await pdf.save('/home/misael/Documents/proyectos/test');
        return 'amir';
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

    @Post('/billing')
    async billing(@Body() query: QueryBilling, @Res() response) {
        const sw = new FactSw();
        const result = await this.service.findSaleByPayment(query);
        const invoiceDetails = ConceptsPriceByPaymentBillig(result.payment, result.sale.miniStoreSaleDetails);
        const branchOfficeSett = await this.branchOfficeSettingService.findOne({
            where: {
                id: query.branchOfficeSettingId,
            },
        });
        const invoiceFind = await this.miniStoreInvoicesService.findInvoiceByPayment({
            paymentId: query.salePaymentId,
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
                if (invoiceFind.miniStoreSalePayment.stamping === 1) {
                    const invocePayment = await this.miniStoreInvoicesService.findInvoiceByPayment({
                        paymentId: query.salePaymentId,
                        status: StatusInvoce.invoiced,
                        stamping: 1,
                    });
                    respuesta.stamping = true;
                    respuesta.invoice = invocePayment;
                    respuesta.msg = 'Pago Facturado';
                    respuesta.uuid = invocePayment.uuid;
                    response.send(respuesta);
                } else {

                    const xml = await GenerateInvoice(
                        {
                            folio: invoiceFind.folio,
                            serie: branchOfficeSett.serieFacturacion,
                        },
                        branchOfficeSett,
                        {
                            Nombre: query.receiver.businessName,
                            Rfc: query.receiver.rfc,
                            UsoCFDI: query.usoCfdi.value,
                        },
                        invoiceDetails);
                    const timbrado = await sw.facturar(xml);
                    await this.service.updatePayment({
                        id: query.salePaymentId,
                        stamping: 1,
                    } as MiniStoreSalePayment);
                    // Guardamos el xml
                    const pathXml = '/var/www/pdc/comprobantes/tienda/' + timbrado.data.uuid.toUpperCase() + '.xml';
                    fs.writeFileSync(pathXml, timbrado.data.cfdi);
                    // Obtenemos los datos del xml
                    const cfdi: XmlCdfi = await XmlToJson(pathXml);
                    // 4. Actualizamos los campos con la factura los datos del sat
                    invoiceFind.uuid = timbrado.data.uuid.toUpperCase();
                    invoiceFind.status = 1;
                    invoiceFind.total = +cfdi['cfdi:Comprobante']._attributes.Total;
                    const resultInvoice = await this.miniStoreInvoicesService.updateInvoice(invoiceFind);
                    // Generamos el PDf del xml
                    const pdf = new PDF(pathXml, 0, {
                        lugarExpedicion: 'CARRETERA FEDERAL CANCUN TULUM KM 292 MANZANA 24 LOTE 24 FRACCION 4 EJIDO PLAYA',
                    });
                    await pdf.save('/var/www/pdc/comprobantes/tienda/' + timbrado.data.uuid.toUpperCase());
                    // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
                    // falta regresar el dato

                    respuesta.stamping = true;
                    respuesta.msg = 'Pago Facturado';
                    respuesta.invoice = resultInvoice;
                    respuesta.uuid = timbrado.data.uuid.toUpperCase();
                    response.send(respuesta);
                }
            } else {
                const factura = new MiniStoreInvoice();
                factura.folio = '';
                factura.uuid = '';
                factura.businessName = query.receiver.businessName;
                factura.rfc = query.receiver.rfc;
                factura.agentBilling = {
                    id: query.agentBillingId,
                } as User;
                factura.status = 0; // Pendiente de procesar en facturación moderna
                factura.miniStoreSale = {
                    id: query.saleId,
                } as MiniStoreSale;
                factura.miniStoreSalePayment = {
                    id: query.salePaymentId,
                } as MiniStoreSalePayment;
                factura.invoiceBranchOffice = {
                    id: query.branchOfficeId,
                } as BranchOffice;
                factura.invoiceBranchOfficeSet = {
                    id: query.branchOfficeSettingId,
                } as BranchOfficeSetting;
                const invoice = await this.miniStoreInvoicesService.saveInvoice(factura);
                console.log(invoice);
                if (invoice) {
                    const xml = await GenerateInvoice(
                        {
                            folio: invoice.folio,
                            serie: branchOfficeSett.serieFacturacion,
                        },
                        branchOfficeSett,
                        {
                            Nombre: query.receiver.businessName,
                            Rfc: query.receiver.rfc,
                            UsoCFDI: query.usoCfdi.value,
                        },
                        invoiceDetails);
                    const timbrado = await sw.facturar(xml);
                    await this.service.updatePayment({
                        id: query.salePaymentId,
                        stamping: 1,
                    } as MiniStoreSalePayment);
                    // Guardamos el xml
                    const pathXml = '/var/www/pdc/comprobantes/tienda/' + timbrado.data.uuid.toUpperCase() + '.xml';
                    fs.writeFileSync(pathXml, timbrado.data.cfdi);
                    // Obtenemos los datos del xml
                    const cfdi: XmlCdfi = await XmlToJson(pathXml);
                    // 4. Actualizamos los campos con la factura los datos del sat
                    invoice.uuid = timbrado.data.uuid.toUpperCase();
                    invoice.status = 1;
                    invoice.total = +cfdi['cfdi:Comprobante']._attributes.Total;
                    const resultInvoiceFirst = await this.miniStoreInvoicesService.updateInvoice(invoice);
                    // Generamos el PDf del xml
                    const pdf = new PDF(pathXml, 0, {
                        lugarExpedicion: 'CARRETERA FEDERAL CANCUN TULUM KM 292 MANZANA 24 LOTE 24 FRACCION 4 EJIDO PLAYA',
                    });
                    await pdf.save('/var/www/pdc/comprobantes/tienda/' + timbrado.data.uuid.toUpperCase());
                    // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
                    // falta regresar el dato

                    respuesta.stamping = true;
                    respuesta.msg = 'Pago Facturado';
                    respuesta.invoice = resultInvoiceFirst;
                    respuesta.uuid = timbrado.data.uuid.toUpperCase();
                    response.send(respuesta);
                }
            }

            // console.log(await sw.getToken());
            // const timbrado = await sw.facturar(xml);
            // console.log(timbrado);
            // response.set('Content-Type', 'text/xml');
            // response.send(xml);

        } catch (e) {
            response.send(e);
        }
    }
}
