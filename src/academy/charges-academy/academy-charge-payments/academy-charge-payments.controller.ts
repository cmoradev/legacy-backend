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
import { MiniStoreInvoice } from '../../../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { AcademyChargeInvoice } from '../academy-charge-invoice/entities/academy-charge-invoice.entity';
import { User } from '../../../system/users/entities/user.entity';
import { MiniStoreSale } from '../../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSalePayment } from '../../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { AcademyCharge } from '../academy-charge/entities/academy-charge.entity';
import { GenerateInvoice } from '../../../mini-store/store-sales/mini-store-sales-payments/utils/generateInvoice';
import * as fs from 'fs';
import { XmlCdfi } from '@signati/core';
import { PDF, XmlToJson } from '@signati/pdf';
import { readFileSync } from 'fs';

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
        // res.send(invoiceDetails);
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
            const logo = readFileSync('/var/www/logos/academiaslogo.png');
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
                    const timbrado = await this.smartWeb.facturar(xml);
                    await this.service.updatePayment({
                        id: query.chargePaymentId,
                        stamping: 1,
                    } as AcademyChargePayments);
                    // Guardamos el xml
                    const pathXml = '/var/www/pdc/comprobantes/academias/' + timbrado.data.uuid.toUpperCase() + '.xml';
                    fs.writeFileSync(pathXml, timbrado.data.cfdi);
                    // Obtenemos los datos del xml
                    const cfdi: XmlCdfi = await XmlToJson(pathXml);
                    // 4. Actualizamos los campos con la factura los datos del sat
                    invoiceFind.uuid = timbrado.data.uuid.toUpperCase();
                    invoiceFind.status = 1;
                    invoiceFind.total = cfdi['cfdi:Comprobante']._attributes.Total;
                    const resultInvoice = await this.academyChargeInvoiceService.updateInvoice(invoiceFind);
                    // Generamos el PDf del xml
                    const pdf = new PDF(pathXml, 0, {
                        lugarExpedicion: 'CARRETERA FEDERAL CANCUN TULUM KM 292 MANZANA 24 LOTE 24 FRACCION 4 EJIDO PLAYA',
                        logo: `data:image/png;base64, ${logo.toString('base64')}`,
                    });
                    await pdf.save('/var/www/pdc/comprobantes/academias/' + timbrado.data.uuid.toUpperCase());
                    // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
                    this.service.sendMail(currentOffice, timbrado.data.uuid, query.receiver.email);
                    // falta regresar el dato
                    respuesta.stamping = true;
                    respuesta.msg = 'Pago Facturado';
                    respuesta.invoice = resultInvoice;
                    respuesta.uuid = timbrado.data.uuid.toUpperCase();
                    res.send(respuesta);

                }
            } else {
                const factura = new AcademyChargeInvoice();

                factura.folio = '';
                factura.uuid = '';
                factura.businessName = query.receiver.businessName;
                factura.rfc = query.receiver.rfc;
                factura.agentBilling = {
                    id: query.agentBillingId,
                } as User;
                factura.status = 0; // Pendiente de procesar en facturación moderna
                factura.academyCharge = {
                    id: query.chargeId,
                } as AcademyCharge;
                factura.academyChargePayment = {
                    id: query.chargePaymentId,
                } as AcademyChargePayments;
                factura.invoiceBranchOffice = {
                    id: query.branchOfficeId,
                } as BranchOffice;
                factura.invoiceBranchOfficeSet = {
                    id: query.branchOfficeSettingId,
                } as BranchOfficeSetting;
                const invoice = await this.academyChargeInvoiceService.saveInvoice(factura);
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
                    const timbrado = await this.smartWeb.facturar(xml);
                    // console.log(timbrado);
                    await this.service.updatePayment({
                        id: query.chargePaymentId,
                        stamping: 1,
                    } as AcademyChargePayments);
                    // Guardamos el xml
                    const pathXml = '/var/www/pdc/comprobantes/academias/' + timbrado.data.uuid.toUpperCase() + '.xml';
                    fs.writeFileSync(pathXml, timbrado.data.cfdi);
                    // Obtenemos los datos del xml
                    const cfdi: XmlCdfi = await XmlToJson(pathXml);
                    // 4. Actualizamos los campos con la factura los datos del sat
                    invoice.uuid = timbrado.data.uuid.toUpperCase();
                    invoice.status = 1;
                    invoice.total = cfdi['cfdi:Comprobante']._attributes.Total;
                    const resultInvoiceFirst = await this.academyChargeInvoiceService.updateInvoice(invoice);
                    // Generamos el PDf del xml
                    const pdf = new PDF(pathXml, 0, {
                        lugarExpedicion: 'CARRETERA FEDERAL CANCUN TULUM KM 292 MANZANA 24 LOTE 24 FRACCION 4 EJIDO PLAYA',
                        logo: `data:image/png;base64, ${logo.toString('base64')}`,
                    });
                    await pdf.save('/var/www/pdc/comprobantes/academias/' + timbrado.data.uuid.toUpperCase());
                    // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
                    this.service.sendMail(currentOffice, timbrado.data.uuid, query.receiver.email);
                    // falta regresar el dato

                    respuesta.stamping = true;
                    respuesta.msg = 'Pago Facturado';
                    respuesta.invoice = resultInvoiceFirst;
                    respuesta.uuid = timbrado.data.uuid.toUpperCase();
                    res.send(respuesta);

                }
            }
        } catch (e) {
            res.send(e);
        }

    }
}
