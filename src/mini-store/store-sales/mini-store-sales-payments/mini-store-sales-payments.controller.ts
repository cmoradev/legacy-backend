import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Res,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import {
    InvoiceMethodsPaymentsService
} from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { QueryBilling } from './interface/InvoiceMiniStore.interface';
import { getDetailsPaymentsGlobal } from '../../../common/point-of-sale/utils';
import { FactSw } from '../../../webService/FactSw';
import {
    GenerateGlobalInvoiceMunyaal,
    GenerateInvoiceMunyaal
} from '../../../common/utils/invoice/generator/generateInvoice';
import { MiniStoreInvoice } from '../mini-store-invoices/entities/mini-store-invoice.entity';
import { MiniStoreInvoicesService } from '../mini-store-invoices/mini-store-invoices.service';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { FormaPago } from '@signati/core';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { ConfigService } from '../../../common/config/config.service';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { NotInvoiced } from '../../../common/interface/not-invoiced.interface';
import { ObjetoImpEnum } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import { Environment, InvoiceModules } from '../../../common/point-of-sale/types.pos';
import { ConceptsPriceByPaymentBilligCalculation } from '../../../common/calculations/calculation';
import { User } from '../../../system/users/entities/user.entity';
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import {
    ExportacionEnum as ExportacionEnumMunyaal,
    MetodoPagoEnum,
    MonedaEnum,
    TipoComprobanteEnum
} from '@munyaal/cfdi';
import { AttachmentsType } from "../../../types";
import { CancellationDto } from 'src/common/dto/Cancellation.dto';

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
        limit: 10,
        join: {
            agent: {eager: false},
            miniStoreSaleMethodPayments: {eager: false},
            'miniStoreSaleMethodPayments.invoiceMethodPayment': {eager: false},
            miniStoreInvoices: {eager: false},
            miniStoreSale: {eager: false},
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

        const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
            payment: result.payment,
            details: result.sale.miniStoreSaleDetails,
            type: InvoiceModules.STORE,
            typeConcept: 'Invoice'
        });

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
                    const timbrado = await GenerateInvoiceMunyaal({
                        type: InvoiceModules.STORE,
                        ...invoiceDetails,
                        folio: invoiceFind.folio,
                        serie: branchOfficeSett.serieFacturacion,
                        emisor: branchOfficeSett,
                        env: this.env,
                        informacionGlobal: query.informacionGlobal,
                        receptor,
                        codigoFormaPago: result.highestPayment.codePaymentMethod as FormaPago,
                        TipoDeComprobante: TipoComprobanteEnum.I,
                        Exportacion: ExportacionEnumMunyaal.E01,
                        MetodoPago: MetodoPagoEnum.PUE,
                        Moneda: MonedaEnum.MXN,
                        related: query.related
                    });

                    await this.service.updatePayment({
                        id: query.salePaymentId,
                        stamping: 1,
                    } as MiniStoreSalePayment);

                    invoiceFind.uuid = timbrado.data.uuid.toUpperCase();
                    invoiceFind.status = 1;
                    invoiceFind.total = parseFloat(timbrado.Total);
                    const resultInvoice = await this.miniStoreInvoicesService.updateInvoice(invoiceFind);

                    await this.service.sendMail(currentOffice, timbrado.data.uuid, query.receiver.email);

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
                    const timbrado = await GenerateInvoiceMunyaal({
                        type: InvoiceModules.STORE,
                        ...invoiceDetails,
                        folio: invoice.folio,
                        serie: branchOfficeSett.serieFacturacion,
                        emisor: branchOfficeSett,
                        env: this.env,
                        informacionGlobal: query.informacionGlobal,
                        receptor,
                        codigoFormaPago: result.highestPayment.codePaymentMethod as FormaPago,
                        TipoDeComprobante: TipoComprobanteEnum.I,
                        Exportacion: ExportacionEnumMunyaal.E01,
                        MetodoPago: MetodoPagoEnum.PUE,
                        Moneda: MonedaEnum.MXN,
                        related: query.related
                    });
                    //Actualizamos el pago
                    await this.service.updatePayment({
                        id: query.salePaymentId,
                        stamping: 1,
                    } as MiniStoreSalePayment);

                    //Actualizamos la factura
                    invoice.uuid = timbrado.data.uuid.toUpperCase();
                    invoice.status = 1;
                    invoice.total = parseFloat(timbrado.Total);
                    const resultInvoiceFirst = await this.miniStoreInvoicesService.updateInvoice(invoice);

                    // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
                    await this.service.sendMail(currentOffice, timbrado.data.uuid, query.receiver.email);

                    respuesta.stamping = true;
                    respuesta.msg = 'Pago Facturado';
                    respuesta.invoice = resultInvoiceFirst;
                    respuesta.uuid = timbrado.data.uuid.toUpperCase();
                    response.status(200);
                    response.send(respuesta);
                }
            }


        } catch (e) {
            console.log(e);
            response.status(400);
            response.send(e);
        }
    }

    @Post('/send-receipt')
    public async sendReceipt(@Body() query: any, @Res() res) {
        try {
            const result = await this.service.findSaleByPayment(query);

            const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
                payment: result.payment,
                details: result.sale.miniStoreSaleDetails,
                type: InvoiceModules.STORE,
                typeConcept: 'Recepit',
            });

            let invoiceFind = undefined;

            if (query.salePaymentId != 0 && result.payment.globalUuid == null) {
                invoiceFind = await this.miniStoreInvoicesService.findInvoiceByPayment({
                    paymentId: query.salePaymentId,
                    status: StatusInvoce.invoiced,
                });
            }

            const branchOfficeSett = await this.branchOfficeSettingService.findOne({
                where: {
                    id: query.branchOfficeSettingId,
                },
            });

            const branchOffice = await this.branchOffice.findBranch(query.branchOfficeId);

            const receipt = await this.service.createReceipt(result, branchOfficeSett, invoiceFind, invoiceDetails);

            const attachments: AttachmentsType[] = [];

            const base64 = await receipt.getBase64();

            const content = Buffer.from(base64, 'base64');

            const filename = `Comprobante-Pago.pdf`.toLowerCase().split(' ').join('-');

            attachments.push({filename, content});

            const data = this.service.sendReceipt(branchOffice, attachments, query.email);

            res.send(data);
        } catch (e: any) {
            console.warn(e);

            res.status(404);

            res.send({
                error: e,
            });
        }
    }

    @Post('/receipt')
    public async billingGet(@Body() query: any, @Res() res) {
        try {
            const result = await this.service.findSaleByPayment(query);

            const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
                payment: result.payment,
                details: result.sale.miniStoreSaleDetails,
                type: InvoiceModules.STORE,
                typeConcept: 'Recepit',
            });

            let invoiceFind = undefined;

            if (query.salePaymentId != 0 && result.payment.globalUuid == null) {
                invoiceFind = await this.miniStoreInvoicesService.findInvoiceByPayment({
                    paymentId: query.salePaymentId,
                    status: StatusInvoce.invoiced,
                });
            }

            const branchOfficeSett = await this.branchOfficeSettingService.findOne({
                where: {
                    id: query.branchOfficeSettingId,
                },
            });

            const receipt = await this.service.createReceipt(result, branchOfficeSett, invoiceFind, invoiceDetails);

            const base64 = await receipt.getBase64();

            res.send({
                src: `data:application/pdf;base64,${base64}`
            })
        } catch (e: any) {
            console.warn(e);

            res.status(404);

            res.send({
                error: e,
            });
        }
    }

    @Post('/not-invoiced')
    @UsePipes(ValidationPipe)
    public async notInvoiced(@Body() query: NotInvoicedDto, @Res() resp): Promise<any> {
        try {
            const data = await this.service.getGlobalInvoiceFromSales(query);

            resp.status(200);
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

            const timbrado = await GenerateGlobalInvoiceMunyaal({
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
                percentageTax: '0.16',
                type: InvoiceModules.STORE,
                TipoDeComprobante: TipoComprobanteEnum.I,
                Exportacion: ExportacionEnumMunyaal.E01,
                MetodoPago: MetodoPagoEnum.PUE,
                Moneda: MonedaEnum.MXN,
            });

            const uuid = timbrado.data.uuid.toUpperCase();

            await this.service.updateStampingPayments(concepts.map((value: NotInvoiced) => value.p_id), uuid);

            invoice.uuid = uuid;
            invoice.status = 1;
            invoice.total = timbrado.Total;

            invoice = await this.miniStoreInvoicesService.updateInvoice(invoice);

            await this.service.sendMail(branchOffice, uuid, branchOfficeConfig.email);

            response.status(200);
            response.send({
                uuid,
                invoice,
                stamping: timbrado,
                concepts,
                msg: 'Factura global timbrada',
            });
        } catch (e) {
            console.log(e);
            response.status(400);
            response.send(e);
        }
    }

    @Get('/details-invoice')
    async detailsInvoiceByUuid(@Query() params: { uuid: string }, @Res() res) {
        try {

            const result = await this.service.detailsInvoiceByUuid(params);
            const invoice = await this.miniStoreInvoicesService.findOne({
                where: {
                    uuid: params.uuid,
                },
                relations: [
                    'agentCanceling',
                    'agentBilling',
                ],
            });
            if (result) {
                const miniStoreSaleDetails = [];
                let folio = '';
                result.forEach((p, index) => {
                    miniStoreSaleDetails.push(...p.miniStoreSale.miniStoreSaleDetails.map((s) => {
                        return {
                            ...s,
                            miniStoreSale: {
                                id: p.miniStoreSale.id,
                                folio: p.miniStoreSale.folio,
                                miniStoreSalePayments: {id: p.id, folio: p.folio}
                            },
                        }
                    }));
                    folio = index == 0 ? p.miniStoreSale.folio : `${folio}, ${p.miniStoreSale.folio}`
                });
                const obj: MiniStoreInvoice = {
                    ...invoice,
                    agentBilling: invoice.agentBilling,
                    agentCanceling: invoice.agentCanceling,
                    miniStoreSale: {
                        id: 0,
                        folio,
                        miniStoreSaleDetails
                    } as MiniStoreSale,
                    miniStoreSalePayment: {
                        change: 0,
                        createdAt: invoice.createdAt,
                        dateCancellation: invoice.cancellationDate,
                        deletedAt: invoice.deletedAt,
                        folio: 'N/A',
                        globalUuid: params.uuid,
                        id: 0,
                        idAgentCancellation: invoice.idCancelingAgent,
                        idSale: 0,
                        idStatusPayment: 1,
                        isIVA: true,
                        observations: "",
                        paymentStatus: 2,
                        quantity: invoice.total,
                        reasonCancellation: invoice.reasonCancellation,
                        stamping: 1,
                        updatedAt: invoice.updatedAt,
                        uuid: params.uuid,
                    } as MiniStoreSalePayment
                } as MiniStoreInvoice
                res.status(200);
                res.send(obj);
            } else {
                res.status(400);
                res.send({
                    error: 'PAYMENTS_NOT_FOUND',
                });
            }
        } catch (e) {

            res.status(400);
            res.send({
                error: {
                    msj: 'NOT_FOUND',
                    details: e
                },
            });
        }
    }

    @Post('/:id/cancel')
    @UsePipes(ValidationPipe)
    async cancelPayment(
    @Param("id") id: string,
    @Body() payload: CancellationDto
    ) {
        return this.service.cancelPayment(+id, payload);
    }
}
