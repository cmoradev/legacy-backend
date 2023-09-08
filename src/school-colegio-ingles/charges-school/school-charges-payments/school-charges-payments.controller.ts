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
    Req,
    Res,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargePayment } from './entities/school-charge-payment.entity';
import { SchoolChargesPaymentsService } from './school-charges-payments.service';
import { QuerySchoolPaymentBilling } from '../../school-payments/interfaces/InvoiceSchoolPayment.interface';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import {
    InvoiceMethodsPaymentsService
} from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { SchoolChargesInvoiceService } from '../school-charges-invoice/school-charges-invoice.service';
import {
    GenerateGlobalInvoiceMunyaal,
    GenerateInvoiceMunyaal,
} from '../../../common/utils/invoice/generator/generateInvoice';
import { FormaPago } from '@signati/core';
import { User } from '../../../system/users/entities/user.entity';
import { FactSw } from '../../../webService/FactSw';
import { SchoolChargesInvoice } from '../school-charges-invoice/entities/school-charges-invoice.entity';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { Response } from 'express';
import {
    QuerySimpleReport
} from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { ConfigService } from '../../../common/config/config.service';
import { StudentsService } from '../../students/students.service';
import { Public } from '../../../common/docorators/public.decorator';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { NotInvoiced, PaymentExtraCharge } from '../../../common/interface/not-invoiced.interface';
import { getDetailsPaymentsGlobal } from '../../../common/point-of-sale/utils';
import { ObjetoImpEnum } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import { Environment, InvoiceModules } from '../../../common/point-of-sale/types.pos';
import { ConceptsPriceByPaymentBilligCalculation } from '../../../common/calculations/calculation';
import { IQueryReportSchoolPayment } from './types/IReport';
import { getNameReport, getRangeDates } from '../../../mini-store/store-sales/mini-store-sales/reports/helpers';
import { IQueryReportSaleTodayOp } from '../../../mini-store/store-sales/mini-store-sales/types/IReport';
import {
    dataFullSale,
    getDataFullMatrizAndData,
    PaymentExcel,
    reportPaymentByClient
} from '../../../common/utils/report/index';
import { convertPaymentsReportCollege } from './reports/payments.util';
import {
    ExportacionEnum as ExportacionEnumMunyaal,
    MetodoPagoEnum,
    MonedaEnum,
    TipoComprobanteEnum
} from '@munyaal/cfdi';
import { AttachmentsType } from "../../../types";

@Crud({
    model: {
        type: SchoolChargePayment,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            schoolCharge: {eager: false},
            'schoolCharge.schoolStudent': {alias: 'schoolStudent', eager: false},
            paymentStatus: {eager: false},
            methodsPayments: {eager: false},
            cashierCharge: {eager: false},
            cashierChargeCancellation: {eager: false},
            schoolChargesInvoice: {eager: false},
            //"schoolChargesInvoice.creditNotesSchool": { eager: false },
        },
    },
})
@Controller()
export class SchoolChargesPaymentsController
    implements CrudController<SchoolChargePayment> {
    private env: Environment = {
        instancePath: this.configService.getPath(),
        xslt: this.configService.getXsltPath()
    };

    constructor(
        readonly service: SchoolChargesPaymentsService,
        readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
        readonly schoolChargeInvoiceService: SchoolChargesInvoiceService,
        readonly branchOffice: BranchOfficeService,
        readonly student: StudentsService,
        readonly branchOfficeSettingService: BranchOfficeSettingService,
        private smartWeb: FactSw,
        private readonly configService: ConfigService,
    ) {
    }

    get base(): CrudController<SchoolChargePayment> {
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

    @Post('/receipt')
    async billingGet(@Body() query: QuerySchoolPaymentBilling, @Res() res) {
        try {
            const result = await this.service.findSaleByPayment(query);

            const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
                payment: result.payment,
                details: result.charge.chargesDetails,
                type: InvoiceModules.SCHOOL,
                ivaDefault: 1,
                ivaByDetail: 0,
                typeConcept: 'Recepit'
            });

            const branchOfficeSett = await this.branchOfficeSettingService.findOne({
                where: {
                    id: query.branchOfficeSettingId,
                },
            });

            const receipt = await this.service.createReceipt(result, branchOfficeSett, query.student, invoiceDetails);

            const base64 = await receipt.getBase64();

            const content = Buffer.from(base64, 'base64');

            res.send({
                src: content
            });
        } catch (e: any) {
            console.warn(e);

            res.status(404);

            res.send({
                error: e,
            });
        }
    }

    @Post('/billing')
    async billing(@Body() query: QuerySchoolPaymentBilling, @Res() response) {
        const result = await this.service.findSaleByPayment(query);

        const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
            payment: result.payment,
            details: result.charge.chargesDetails,
            type: InvoiceModules.SCHOOL,
            ivaDefault: 1,
            ivaByDetail: 0,
            typeConcept: 'Invoice'
        });

        const currentOffice = await this.branchOffice.findBranch(
            query.branchOfficeId,
        );

        const branchOfficeSett = await this.branchOfficeSettingService.findOne({
            where: {
                id: query.branchOfficeSettingId,
            },
        });

        const invoiceFinded = await this.schoolChargeInvoiceService.findInvoiceByPayment(
            {
                paymentId: query.chargePaymentId,
                status: StatusInvoce.noBilling,
            },
        );

        const invoiceResponse = {
            stamping: false,
            msg: '',
            invoice: {},
            uuid: '',
        };

        const env = {
            instancePath: this.configService.getPath(),
            xslt: this.configService.getXsltPath(),
        };

        const receptor = {
            Nombre: query.receiver.businessName,
            Rfc: query.receiver.rfc,
            UsoCFDI: query.usoCfdi.value,
            DomicilioFiscalReceptor: query.receiver.domicilioFiscalReceptor,
            RegimenFiscalReceptor: query.receiver.keyRegimen,
        };


        const capitalizarPrimeraLetra = (str: string) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        const student = {
            version: '1.0',
            nombreAlumno: `${query.student.name} ${query.student.lastNameFather} ${query.student.lastNameMother}`,
            CURP: query.student.curp,
            nivelEducativo: capitalizarPrimeraLetra(query.studyPlan.level.name.toLocaleLowerCase()),
            autRVOE: query.studyPlan.code,
            rfcPago: query.receiver.rfc,
        };
        try {
            if (invoiceFinded) {
                if (invoiceFinded.schoolChargePayment.stamping === 1) {
                    const invoicePayment = await this.schoolChargeInvoiceService.findInvoiceByPayment(
                        {
                            paymentId: query.chargePaymentId,
                            status: StatusInvoce.invoiced,
                            stamping: 1,
                        },
                    );
                    invoiceResponse.stamping = true;
                    invoiceResponse.invoice = invoicePayment;
                    invoiceResponse.msg = 'PAGO FACTURADO';
                    invoiceResponse.uuid = invoicePayment.uuid;
                    response.send(invoiceResponse);
                } else {

                    const timbrado = await GenerateInvoiceMunyaal({
                        type: InvoiceModules.SCHOOL,
                        ...invoiceDetails,
                        folio: invoiceFinded.folio,
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
                        student,
                        related: query.related
                    });

                    await this.service.updatePayment({
                        id: query.chargePaymentId,
                        stamping: 1,
                    } as SchoolChargePayment);

                    invoiceFinded.uuid = timbrado.data.uuid.toUpperCase();
                    invoiceFinded.status = 1;
                    invoiceFinded.total = parseFloat(timbrado.Total);

                    const resultInvoice = await this.schoolChargeInvoiceService.updateInvoice(
                        invoiceFinded,
                    );
                    // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
                    this.schoolChargeInvoiceService.sendMail(
                        currentOffice,
                        timbrado.data.uuid,
                        query.receiver.email,
                    );
                    // falta regresar el dato
                    invoiceResponse.stamping = true;
                    invoiceResponse.msg = 'Pago Facturado';
                    invoiceResponse.invoice = resultInvoice;
                    invoiceResponse.uuid = timbrado.data.uuid.toUpperCase();
                    response.send(invoiceResponse);
                }
            } else {
                const factura = new SchoolChargesInvoice();
                factura.folio = '';
                factura.uuid = '';
                factura.businessName = query.receiver.businessName;
                factura.rfc = query.receiver.rfc;
                factura.agentBilling = {
                    id: query.agentBillingId,
                } as User;
                factura.status = 0; // Pendiente de procesar en facturación moderna
                factura.schoolCharge = {
                    id: query.chargeId,
                } as SchoolCharge;
                factura.schoolChargePayment = {
                    id: query.chargePaymentId,
                } as SchoolChargePayment;
                factura.invoiceBranchOffice = {
                    id: query.branchOfficeId,
                } as BranchOffice;
                factura.invoiceBranchOfficeSet = {
                    id: query.branchOfficeSettingId,
                } as BranchOfficeSetting;
                const invoice = await this.schoolChargeInvoiceService.saveInvoice(
                    factura,
                );
                if (invoice) {
                    const timbrado = await GenerateInvoiceMunyaal({
                        type: InvoiceModules.SCHOOL,
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
                        student,
                        related: query.related
                    });

                    await this.service.updatePayment({
                        id: query.chargePaymentId,
                        stamping: 1,
                    } as SchoolChargePayment);

                    invoice.uuid = timbrado.data.uuid.toUpperCase();
                    invoice.status = 1;
                    invoice.total = parseFloat(timbrado.Total);

                    const resultInvoiceFirst = await this.schoolChargeInvoiceService.updateInvoice(
                        invoice,
                    );
                    // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
                    await this.schoolChargeInvoiceService.sendMail(
                        currentOffice,
                        timbrado.data.uuid,
                        query.receiver.email,
                    );
                    // falta regresar el dato
                    invoiceResponse.stamping = true;
                    invoiceResponse.msg = 'Pago Facturado';
                    invoiceResponse.invoice = resultInvoiceFirst;
                    invoiceResponse.uuid = timbrado.data.uuid.toUpperCase();
                    response.send(invoiceResponse);
                }
            }
        } catch (e) {
            console.log(e);
            response.status(400);
            response.send(e);
        }
    }

    @Get('/report-school-payment')
    private async reportSchoolPayment(
        @Res() res: Response,
        @Query() options: IQueryReportSchoolPayment,
    ) {

        const obj = getDataFullMatrizAndData(
            await this.service.reportSchoolPayment(options),
            InvoiceModules.SCHOOL,
            false,
            options.status != null ? parseInt(`${options.status}`) : 0);

        let dataByClient = [];

        if (options.byClient) {
            dataByClient = reportPaymentByClient(obj.data);
        }

        if (options?.isExported) {
            const conceptStatusExcel = new PaymentExcel(options, options.byClient ? dataByClient : obj.data, obj.matriz, InvoiceModules.SCHOOL, 'Pagos')
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `Sc_Pagos_${getRangeDates(options.startDate, options.endDate).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `Sc_Pagos_${getRangeDates(options.startDate, options.endDate).excel}`,
            };
            return res.send({report, data: options.byClient ? dataByClient : obj.data, obj});
        } else {
            return res.send({report: false, data: options.byClient ? dataByClient : obj.data, obj});
        }
    }

    @Get('/report-school-payment-invoice')
    private async reportSchoolPaymentInvoice(
        @Res() res: Response,
        @Query() options: IQueryReportSchoolPayment,
    ) {
        const obj = getDataFullMatrizAndData(
            await this.service.reportSchoolPaymentInvoice(options),
            InvoiceModules.SCHOOL,
            true,
            options.status != null ? parseInt(`${options.status}`) : 0);

        let dataByClient = [];

        if (options.byClient) {
            dataByClient = reportPaymentByClient(obj.data);
        }

        if (options?.isExported) {
            const conceptStatusExcel = new PaymentExcel(options, options.byClient ? dataByClient : obj.data, obj.matriz, InvoiceModules.SCHOOL, 'Pagos Facturados')
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `Sc_Pagos_facturados_${getRangeDates(options.startDate, options.endDate).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `Sc_Pagos_facturados_${getRangeDates(options.startDate, options.endDate).excel}`,
            };
            return res.send({report, data: options.byClient ? dataByClient : obj.data, obj});
        } else {
            return res.send({report: false, data: options.byClient ? dataByClient : obj.data, obj});
        }
    }

    @Get('report-sale-school')
    private async reportSaleSchool(
        @Res() res,
        @Query() options: IQueryReportSaleTodayOp,
    ) {
        const result = await this.service.reportSalesSchool(options);
        let data: PaymentExtraCharge[] = dataFullSale(result, InvoiceModules.SCHOOL)
        let dataByClient = [];

        if (options.byClient) {
            dataByClient = reportPaymentByClient(data);
        }

        if (options?.isExported) {
            const conceptStatusExcel = new PaymentExcel(options, options.byClient ? dataByClient : data, [], InvoiceModules.SCHOOL, 'Ventas');
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `${getNameReport(options.byClient ? 'Ventas_por_cliente' : 'Ventas', options).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `${getNameReport(options.byClient ? 'Ventas_por_cliente' : 'Ventas', options).excel}`,
            };
            return res.send({report, data: options.byClient ? dataByClient : data});
        } else {
            return res.send({report: false, data: options.byClient ? dataByClient : data});
        }
    }

    @Public()
    @Get('/simple-report')
    async simpleReport(
        @Req() request,
        @Res() response: Response,
        @Query() query: QuerySimpleReport,
    ) {
        const payments = await this.service.fetchFilteredPayments(query);
        const charges = await this.service.fetchFilteredSales(query);
        const res = {
            payments: {
                matriz: [],
                payments: [],
            },
            sales: [],
            returns: [],
            file: '',
        };
        if (query.onlyFile) {
            res.file = await this.service.simpleReport(payments, charges, query, {
                base64: true,
            });
        } else {
            const cashiers = await this.service.getUserCasher();
            const paymenMethods = await this.invoiceMethodsPaymentsService.repo.find({
                where: {
                    showReport: true,
                    isActive: true,
                },
            });
            const viewPayments = convertPaymentsReportCollege(
                payments,
                cashiers,
                paymenMethods,
            );
            res.payments = viewPayments;
        }
        return response.send(res);
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

            const details = getDetailsPaymentsGlobal(concepts, ObjetoImpEnum.NoobjetoDeimpuesto, 0);

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
                percentageTax: '0',
                type: InvoiceModules.SCHOOL,
                TipoDeComprobante: TipoComprobanteEnum.I,
                Exportacion: ExportacionEnumMunyaal.E01,
                MetodoPago: MetodoPagoEnum.PUE,
                Moneda: MonedaEnum.MXN,
            });


            await this.service.updateStampingPayments(concepts.map((value: NotInvoiced) => value.p_id), timbrado.data.uuid.toUpperCase());

            invoice.uuid = timbrado.data.uuid.toUpperCase();
            invoice.status = 1;
            invoice.total = timbrado.Total

            invoice = await this.schoolChargeInvoiceService.updateInvoice(invoice);

            await this.schoolChargeInvoiceService.sendMail(branchOffice, timbrado.data.uuid.toUpperCase(), branchOfficeConfig.email);

            response.status(200);
            response.send({
                uuid: timbrado.data.uuid.toUpperCase(),
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
            const invoice = await this.schoolChargeInvoiceService.findOne({
                where: {
                    uuid: params.uuid,
                },
                relations: [
                    'agentCanceling',
                    'agentBilling',
                ],
            });
            if (result) {
                const chargesDetails = [];
                let folio = '';
                result.forEach((p, index) => {
                    chargesDetails.push(...p.schoolCharge.chargesDetails.map((s) => {
                        return {
                            ...s,
                            schoolCharge: {
                                id: p.schoolCharge.id,
                                folio: p.schoolCharge.folio,
                                chargesPayments: {id: p.id, folio: p.folio}
                            },
                        }
                    }));
                    folio = index == 0 ? p.schoolCharge.folio : `${folio}, ${p.schoolCharge.folio}`
                });
                const obj: SchoolChargesInvoice = {
                    ...invoice,
                    agentBilling: invoice.agentBilling,
                    agentCanceling: invoice.agentCanceling,
                    schoolCharge: {
                        id: 0,
                        folio,
                        chargesDetails
                    } as SchoolCharge,
                    schoolChargePayment: {
                        change: 0,
                        createdAt: invoice.createdAt,
                        dateCancellation: invoice.cancellationDate,
                        deletedAt: invoice.deletedAt,
                        folio: 'N/A',
                        globalUuid: params.uuid,
                        id: 0,
                        cashierChargeCancellation: invoice.agentCanceling,
                        isIVA: true,
                        observations: "",
                        paymentStatus: 2,
                        quantity: invoice.total,
                        stamping: 1,
                        updatedAt: invoice.updatedAt,
                        uuid: params.uuid,
                        reasonCancellation: invoice.reasonCancellation,
                    } as SchoolChargePayment
                } as SchoolChargesInvoice
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

    @Post('/send-receipt')
    public async sendReceipt(@Body() query: any, @Res() res) {
        try {
            const result = await this.service.findSaleByPayment(query);

            const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
                payment: result.payment,
                details: result.charge.chargesDetails,
                type: InvoiceModules.SCHOOL,
                ivaDefault: 1,
                ivaByDetail: 0,
                typeConcept: 'Recepit'
            });

            const branchOfficeSett = await this.branchOfficeSettingService.findOne({
                where: {
                    id: query.branchOfficeSettingId,
                },
            });

            const branchOffice = await this.branchOffice.findBranch(query.branchOfficeId);

            const receipt = await this.service.createReceipt(result, branchOfficeSett, query.student, invoiceDetails);

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

}
