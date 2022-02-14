import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { QueryBilling } from './interface/InvoiceMiniStore.interface';
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
import { readFileSync } from 'fs';
import { FormaPago, XmlCdfi } from '@signati/core';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { ConfigService } from '../../../common/config/config.service';
import { A117 } from '../../../pdf/A117/desing/A117';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStoreSalePayment,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
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
        readonly branchOffice: BranchOfficeService,
        readonly branchOfficeSettingService: BranchOfficeSettingService,
        private smartWeb: FactSw,
        private readonly configService: ConfigService,
    ) {
    }

    get base(): CrudController<MiniStoreSalePayment> {
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

    @Post('/billing')
    async billing(@Body() query: QueryBilling, @Res() response) {
        const result = await this.service.findSaleByPayment(query);
        const invoiceDetails = ConceptsPriceByPaymentBillig(result.payment, result.sale.miniStoreSaleDetails);

        const currentOffice = await this.branchOffice.findBranch(query.branchOfficeId);
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
            const logo = readFileSync(`${this.configService.getPath()}logos/tienditalogo.png`);

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
                    response.status(200);
                    response.send(respuesta);
                } else {
                    const xml = await GenerateInvoice(
                        {
                            folio: invoiceFind.folio,
                            serie: branchOfficeSett.serieFacturacion,
                        },
                        result.highestPayment.codePaymentMethod as FormaPago,
                        branchOfficeSett,
                        {
                            Nombre: query.receiver.businessName,
                            Rfc: query.receiver.rfc,
                            UsoCFDI: query.usoCfdi.value,
                        },
                        invoiceDetails,
                        this.configService.getPath());
                    const timbrado = await this.smartWeb.facturar(xml);
                    await this.service.updatePayment({
                        id: query.salePaymentId,
                        stamping: 1,
                    } as MiniStoreSalePayment);
                    // Guardamos el xml
                    const pathXml = `${this.configService.getPath()}comprobantes/tienda/` + timbrado.data.uuid.toUpperCase() + '.xml';
                    fs.writeFileSync(pathXml, timbrado.data.cfdi);
                    // Obtenemos los datos del xml
                    const cfdi: XmlCdfi = await XmlToJson(pathXml);
                    // 4. Actualizamos los campos con la factura los datos del sat
                    invoiceFind.uuid = timbrado.data.uuid.toUpperCase();
                    invoiceFind.status = 1;
                    invoiceFind.total = +cfdi['cfdi:Comprobante']._attributes.Total;
                    const resultInvoice = await this.miniStoreInvoicesService.updateInvoice(invoiceFind);
                    // Generamos el PDf del xml

                    const desingpdf = new A117(pathXml, {
                        lugarExpedicion: branchOfficeSett.address,
                        logo: `data:image/png;base64, ${logo.toString('base64')}`,
                    });
                    const pdf = new PDF<A117>(desingpdf);
                    await pdf.save(`${this.configService.getPath()}comprobantes/tienda/` + timbrado.data.uuid.toUpperCase());
                    // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
                    await this.service.sendMail(currentOffice, timbrado.data.uuid, query.receiver.email);

                    console.log('Respuesta: ', JSON.stringify(respuesta));
                    // falta regresar el dato
                    respuesta.stamping = true;
                    respuesta.msg = 'Pago Facturado';
                    respuesta.invoice = resultInvoice;
                    respuesta.uuid = timbrado.data.uuid.toUpperCase();
                    response.status(200);
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

                if (invoice) {
                    const xml = await GenerateInvoice(
                        {
                            folio: invoice.folio,
                            serie: branchOfficeSett.serieFacturacion,
                        },
                        result.highestPayment.codePaymentMethod as FormaPago,
                        branchOfficeSett,
                        {
                            Nombre: query.receiver.businessName,
                            Rfc: query.receiver.rfc,
                            UsoCFDI: query.usoCfdi.value,
                        },
                        invoiceDetails,
                        this.configService.getPath());
                    const timbrado = await this.smartWeb.facturar(xml);
                    await this.service.updatePayment({
                        id: query.salePaymentId,
                        stamping: 1,
                    } as MiniStoreSalePayment);
                    // Guardamos el xml
                    const pathXml = `${this.configService.getPath()}comprobantes/tienda/` + timbrado.data.uuid.toUpperCase() + '.xml';
                    fs.writeFileSync(pathXml, timbrado.data.cfdi);
                    // Obtenemos los datos del xml
                    const cfdi: XmlCdfi = await XmlToJson(pathXml);
                    // 4. Actualizamos los campos con la factura los datos del sat
                    invoice.uuid = timbrado.data.uuid.toUpperCase();
                    invoice.status = 1;
                    invoice.total = +cfdi['cfdi:Comprobante']._attributes.Total;
                    const resultInvoiceFirst = await this.miniStoreInvoicesService.updateInvoice(invoice);
                    // Generamos el PDf del xml
                    const desingpdf = new A117(pathXml, {
                        lugarExpedicion: branchOfficeSett.address,
                        logo: `data:image/png;base64, ${logo.toString('base64')}`,
                    });
                    const pdf = new PDF<A117>(desingpdf);
                    await pdf.save(`${this.configService.getPath()}comprobantes/tienda/` + timbrado.data.uuid.toUpperCase());
                    // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
                    await this.service.sendMail(currentOffice, timbrado.data.uuid, query.receiver.email);
                    // falta regresar el dato

                    respuesta.stamping = true;
                    respuesta.msg = 'Pago Facturado';
                    respuesta.invoice = resultInvoiceFirst;
                    respuesta.uuid = timbrado.data.uuid.toUpperCase();
                    response.status(200);
                    console.log('RESPONSE: ', JSON.stringify(respuesta))
                    response.send(respuesta);
                }
            }

            // const timbrado = await sw.facturar(xml);
            // response.set('Content-Type', 'text/xml');
            // response.send(xml);

        } catch (e) {
            console.warn(e);
            response.status(400);
            response.send(e);
        }
    }
}
