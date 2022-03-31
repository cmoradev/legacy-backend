import { Body, Controller, Delete, NotFoundException, Param, ParseIntPipe, Post, Put, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { QueryBilling } from './interface/InvoiceMiniStore.interface';
import { ConceptsPriceByPaymentBillig, Environment, getDetailsPaymentsGlobal } from '../../../common/point-of-sale/miniStore-point-of-sale';
import { FactSw } from '../../../webService/FactSw';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
import { GenerateGlobalInvoice, GenerateInvoice } from './utils/generateInvoice';
import { MiniStoreInvoice } from '../mini-store-invoices/entities/mini-store-invoice.entity';
import { MiniStoreInvoicesService } from '../mini-store-invoices/mini-store-invoices.service';
import { User } from '../../../system/users/entities/user.entity';
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { PDF, XmlToJson } from '@signati/pdf';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import { FormaPago } from '@signati/core';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { ConfigService } from '../../../common/config/config.service';
import { A117 } from '../../../pdf/A117/desing/A117';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { NotInvoiced } from '../../../common/interface/not-invoiced.interface';
import { ObjetoImpEnum } from '@signati/core/lib/signati/types/Tags/concepts.interface';

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
    private env: Environment = {
        instancePath: this.configService.getPath(),
        xslt: this.configService.getXsltPath()
    };

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

        const receptor = {
            Nombre: query.receiver.businessName,
            Rfc: query.receiver.rfc,
            UsoCFDI: query.usoCfdi.value,
            DomicilioFiscalReceptor: query.receiver.domicilioFiscalReceptor,
            RegimenFiscalReceptor: query.receiver.keyRegimen,
        }
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
                    const xml = await GenerateInvoice({
                        ...invoiceDetails,
                        folio: invoiceFind.folio,
                        serie: branchOfficeSett.serieFacturacion,
                        emisor: branchOfficeSett,
                        env: this.env,
                        informacionGlobal: query.informacionGlobal,
                        receptor,
                        codigoFormaPago: result.highestPayment.codePaymentMethod as FormaPago
                    });

                    const timbrado = await this.smartWeb.facturar(xml);
                    await this.service.updatePayment({
                        id: query.salePaymentId,
                        stamping: 1,
                    } as MiniStoreSalePayment);
                    // Guardamos el xml
                    const pathXml = `${this.configService.getPath()}comprobantes/tienda/` + timbrado.data.uuid.toUpperCase() + '.xml';
                    fs.writeFileSync(pathXml, timbrado.data.cfdi);
                    // Obtenemos los datos del xml
                    const cfdi = await XmlToJson(pathXml);
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
                    const xml = await GenerateInvoice({
                        ...invoiceDetails,
                        folio: invoice.folio,
                        serie: branchOfficeSett.serieFacturacion,
                        emisor: branchOfficeSett,
                        env: this.env,
                        informacionGlobal: query.informacionGlobal,
                        receptor,
                        codigoFormaPago: result.highestPayment.codePaymentMethod as FormaPago
                    });
                    const timbrado = await this.smartWeb.facturar(xml);

                    await this.service.updatePayment({
                        id: query.salePaymentId,
                        stamping: 1,
                    } as MiniStoreSalePayment);
                    // Guardamos el xml
                    const pathXml = `${this.configService.getPath()}comprobantes/tienda/` + timbrado.data.uuid.toUpperCase() + '.xml';
                    fs.writeFileSync(pathXml, timbrado.data.cfdi);
                    // Obtenemos los datos del xml
                    const cfdi = await XmlToJson(pathXml);
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
                    response.send(respuesta);
                }
            }

        } catch (e) {
            console.warn(e);
            response.status(400);
            response.send(e);
        }
    }

    @Post('/not-invoiced')
    @UsePipes(ValidationPipe)
    public async notInvoiced(@Body() query: NotInvoicedDto, @Res() resp): Promise<any> {
        try {
            const data = await this.service.getGlobalInvoiceFromSales(query);

            resp.status(400);
            resp.send(data);
        } catch (e) {
            resp.status(400);
            resp.send(e);
        }
    }

    @Post('/global-billing')
    @UsePipes(ValidationPipe)
    public async globalBilling(@Body() query: NotInvoicedDto, @Res() response): Promise<any> {
        try {
            const concepts: NotInvoiced[] = await this.service.notInvoiced(query);

            if (!concepts.length) {
                throw new NotFoundException('Concepts not exists');
            }

            const details = getDetailsPaymentsGlobal(concepts, ObjetoImpEnum.SíObjetoDeImpuesto);

            const wayPayment = await this.service.getWayPayment(concepts);

            const branchOffice = await this.branchOffice.findBranch(query.branchOfficeId);

            const branchOfficeConfig = await this.branchOfficeSettingService.findOne({
                where: {id: query.branchOfficeId}
            });

            let invoice = await this.service.getGlobalInvoice(branchOffice, branchOfficeConfig);

            const xml = await GenerateGlobalInvoice({
                branchOfficeConfig,
                wayPayment,
                details,
                env: this.env,
                folio: invoice.folio,
                infoGlobal: {
                    periodicity: query.periodicity,
                    month: query.month,
                    year: query.year,
                },
                percentageTax: '0.160000'
            });

            const stamping = await this.smartWeb.facturar(xml);

            const uuid = stamping.data.uuid.toUpperCase();

            await this.service.updateStampingPayments(concepts.map((value: NotInvoiced) => value.p_id), uuid);

            const cfdi = await this.service.saveXmlAndPdf(uuid, stamping.data.cfdi, branchOfficeConfig.address)

            invoice.uuid = uuid;
            invoice.status = 1;
            invoice.total = +cfdi._attributes.Total;

            invoice = await this.miniStoreInvoicesService.updateInvoice(invoice);

            await this.service.sendMail(branchOffice, uuid, branchOfficeConfig.email);

            response.status(200);
            response.send({
                uuid,
                invoice,
                stamping,
                concepts,
                msg: 'Factura global timbrada',
            });
        } catch (e) {
            console.warn(e);
            response.status(400);
            response.send(e);
        }
    }
}
