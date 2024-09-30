import {
  BadRequestException,
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
import { AcademyChargePaymentsService } from './academy-charge-payments.service';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';
import { QuerySimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { convertPaymentsReportAc } from './reports/payments.util';
import { QueryBillingAcademy } from './types/InvoiceAcademy.interface';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { AcademyChargeInvoiceService } from '../academy-charge-invoice/academy-charge-invoice.service';
import { FactSw } from '../../../webService/FactSw';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { Response } from 'express';
import { AcademyChargeInvoice } from '../academy-charge-invoice/entities/academy-charge-invoice.entity';
import { User } from '../../../system/users/entities/user.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { AcademyCharge } from '../academy-charge/entities/academy-charge.entity';
import {
  GenerateGlobalInvoiceMunyaal,
  GenerateInvoiceMunyaal,
} from '../../../common/utils/invoice/generator/generateInvoice';
import { FormaPago } from '@signati/core';
import { ConfigService } from '../../../common/config/config.service';
import { Public } from '../../../common/docorators/public.decorator';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { NotInvoiced } from '../../../common/interface/not-invoiced.interface';
import { getDetailsPaymentsGlobal } from '../../../common/point-of-sale/utils';
import { ObjetoImpEnum } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import {
  Environment,
  InvoiceModules,
} from '../../../common/point-of-sale/types.pos';
import { ConceptsPriceByPaymentBilligCalculation } from '../../../common/calculations/calculation';
import { IQueryReportAcademiaPayment } from './types/IReports';
import { getRangeDates } from '../../../mini-store/store-sales/mini-store-sales/reports/helpers';
import {
  getDataFullMatrizAndData,
  PaymentExcel,
  reportPaymentByClient,
} from '../../../common/utils/report';
import {
  ExportacionEnum as ExportacionEnumMunyaal,
  MetodoPagoEnum,
  MonedaEnum,
  TipoComprobanteEnum,
} from '@munyaal/cfdi';
import { AttachmentsType } from '../../../types';
import { AcademyIncomeReportQuery } from './dto/academy-income-report-query';
import { ExcelIncomeAcademy } from 'src/common/utils/report/excel.income.academy';
import * as moment from 'moment';

@Crud({
  model: {
    type: AcademyChargePayments,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null,
      },
    },
    limit: 10,
    join: {
      academyCharge: { eager: false },
      'academyCharge.chargesDetails': { eager: false },
      'academyCharge.schoolStudent': { eager: false },
      'academyCharge.chargesDetails.extraCharges': { eager: false },
      academyPaymentOffice: { eager: false },
      academyPaymentOfficeSet: { eager: false },
      methodsPayments: { eager: false },
      cashierCharge: { eager: false },
      cashierChargeCancellation: { eager: false },
      academyChargesInvoice: { eager: false },
    },
  },
})
@Controller()
export class AcademyChargePaymentsController
  implements CrudController<AcademyChargePayments> {
  private env: Environment = {
    instancePath: this.configService.getPath(),
    xslt: this.configService.getXsltPath(),
  };

  constructor(
    readonly service: AcademyChargePaymentsService,
    readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
    readonly academyChargeInvoiceService: AcademyChargeInvoiceService,
    readonly branchOffice: BranchOfficeService,
    readonly branchOfficeSettingService: BranchOfficeSettingService,
    private readonly configService: ConfigService,
  ) {}

  get base(): CrudController<AcademyChargePayments> {
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

  @Public()
  @Get('/simple-report')
  async simpleReport(
    @Req() request,
    @Res() response,
    @Query() query: QuerySimpleReport,
  ) {
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
      result.file = await this.service.simpleReport(payments, charges, {
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

      const viewPayments = convertPaymentsReportAc(
        payments,
        cashiers,
        paymenMethods,
      );
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
    const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
      payment: result.payment,
      details: result.charge.chargesDetails,
      type: InvoiceModules.ACADEMY,
      typeConcept: 'Invoice',
    });

    const currentOffice = await this.branchOffice.findBranch(
      query.branchOfficeId,
    );
    const branchOfficeSett = await this.branchOfficeSettingService.findOne({
      where: {
        id: query.branchOfficeSettingId,
      },
    });
    const invoiceFind = await this.academyChargeInvoiceService.findInvoiceByPayment(
      {
        paymentId: query.chargePaymentId,
        status: StatusInvoce.noBilling,
      },
    );

    const respuesta = {
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

    try {
      if (invoiceFind) {
        if (invoiceFind.academyChargePayment.stamping === 1) {
          const invocePayment = await this.academyChargeInvoiceService.findInvoiceByPayment(
            {
              paymentId: query.chargePaymentId,
              status: StatusInvoce.invoiced,
              stamping: 1,
            },
          );
          respuesta.stamping = true;
          respuesta.invoice = invocePayment;
          respuesta.msg = 'Pago Facturado';
          respuesta.uuid = invocePayment.uuid;
          res.send(respuesta);
        } else {
          const timbrado = await GenerateInvoiceMunyaal({
            type: InvoiceModules.ACADEMY,
            ...invoiceDetails,
            folio: invoiceFind.folio,
            serie: branchOfficeSett.serieFacturacion,
            emisor: branchOfficeSett,
            env: this.env,
            informacionGlobal: query.informacionGlobal,
            receptor,
            codigoFormaPago: result.highestPayment
              .codePaymentMethod as FormaPago,
            TipoDeComprobante: TipoComprobanteEnum.I,
            Exportacion: ExportacionEnumMunyaal.E01,
            MetodoPago: MetodoPagoEnum.PUE,
            Moneda: MonedaEnum.MXN,
            related: query.related,
          });

          await this.service.updatePayment({
            id: query.chargePaymentId,
            stamping: 1,
          } as AcademyChargePayments);

          invoiceFind.uuid = timbrado.data.uuid.toUpperCase();
          invoiceFind.status = 1;
          invoiceFind.total = timbrado.Total;
          const resultInvoice = await this.academyChargeInvoiceService.updateInvoice(
            invoiceFind,
          );

          this.service.sendMail(
            currentOffice,
            timbrado.data.uuid,
            query.receiver.email,
          );
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
        const invoice = await this.academyChargeInvoiceService.saveInvoice(
          factura,
        );
        if (invoice) {
          const timbrado = await GenerateInvoiceMunyaal({
            type: InvoiceModules.ACADEMY,
            ...invoiceDetails,
            folio: invoice.folio,
            serie: branchOfficeSett.serieFacturacion,
            emisor: branchOfficeSett,
            env: this.env,
            informacionGlobal: query.informacionGlobal,
            receptor,
            codigoFormaPago: result.highestPayment
              .codePaymentMethod as FormaPago,
            TipoDeComprobante: TipoComprobanteEnum.I,
            Exportacion: ExportacionEnumMunyaal.E01,
            MetodoPago: MetodoPagoEnum.PUE,
            Moneda: MonedaEnum.MXN,
            related: query.related,
          });
          await this.service.updatePayment({
            id: query.chargePaymentId,
            stamping: 1,
          } as AcademyChargePayments);
          invoice.uuid = timbrado.data.uuid.toUpperCase();
          invoice.status = 1;
          invoice.total = timbrado.Total;
          const resultInvoiceFirst = await this.academyChargeInvoiceService.updateInvoice(
            invoice,
          );
          // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
          this.service.sendMail(
            currentOffice,
            timbrado.data.uuid,
            query.receiver.email,
          );
          // falta regresar el dato

          respuesta.stamping = true;
          respuesta.msg = 'Pago Facturado';
          respuesta.invoice = resultInvoiceFirst;
          respuesta.uuid = timbrado.data.uuid.toUpperCase();
          res.send(respuesta);
        }
      }
    } catch (e) {
      console.log(e);
      res.status(400);
      res.send(e);
    }
  }

  @Post('/send-receipt')
  public async sendReceipt(@Body() query: any, @Res() res) {
    try {
      const result = await this.service.findSaleByPayment(query);

      const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
        payment: result.payment,
        details: result.charge.chargesDetails,
        type: InvoiceModules.ACADEMY,
        typeConcept: 'Recepit',
      });

      let invoiceFind = undefined;

      if (result.payment.globalUuid == null) {
        invoiceFind = await this.academyChargeInvoiceService.findInvoiceByPayment(
          {
            paymentId: query.chargePaymentId,
            status: StatusInvoce.invoiced,
          },
        );
      }

      const branchOfficeSett = await this.branchOfficeSettingService.findOne({
        where: {
          id: query.branchOfficeSettingId,
        },
      });

      const branchOffice = await this.branchOffice.findBranch(
        query.branchOfficeId,
      );

      const receipt = await this.service.createReceipt(
        result,
        branchOfficeSett,
        invoiceFind,
        invoiceDetails,
      );

      const attachments: AttachmentsType[] = [];

      const base64 = await receipt.getBase64();

      const content = Buffer.from(base64, 'base64');

      const filename = `Comprobante-Pago.pdf`
        .toLowerCase()
        .split(' ')
        .join('-');

      attachments.push({ filename, content });

      const data = this.service.sendReceipt(
        branchOffice,
        attachments,
        query.email,
      );

      res.send(data);
    } catch (e) {
      console.warn(e);

      res.status(404);

      res.send({
        error: e,
      });
    }
  }

  @Post('/receipt')
  async billingGet(@Body() query: QueryBillingAcademy, @Res() res: Response) {
    try {
      const result = await this.service.findSaleByPayment(query);

      const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
        payment: result.payment,
        details: result.charge.chargesDetails,
        type: InvoiceModules.ACADEMY,
        typeConcept: 'Recepit',
      });

      let invoiceFind = undefined;

      if (result.payment.globalUuid == null) {
        invoiceFind = await this.academyChargeInvoiceService.findInvoiceByPayment(
          {
            paymentId: query.chargePaymentId,
            status: StatusInvoce.invoiced,
          },
        );
      }

      const branchOfficeSett = await this.branchOfficeSettingService.findOne({
        where: {
          id: query.branchOfficeSettingId,
        },
      });

      const receipt = await this.service.createReceipt(
        result,
        branchOfficeSett,
        invoiceFind,
        invoiceDetails,
      );

      const base64 = await receipt.getBase64();

      res.send({
        src: `data:application/pdf;base64,${base64}`,
      });
    } catch (e) {
      console.warn(e);

      res.status(404);

      res.send({
        error: e,
      });
    }
  }

  @Post('/not-invoiced')
  @UsePipes(ValidationPipe)
  public async notInvoiced(
    @Body() query: NotInvoicedDto,
    @Res() resp,
  ): Promise<any> {
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
  public async globalBilling(
    @Body() query: NotInvoicedDto,
    @Res() response,
  ): Promise<any> {
    try {
      const concepts: NotInvoiced[] = await this.service.notInvoiced(query);

      if (!concepts.length) {
        throw new NotFoundException('Concepts not exists');
      }

      const details = getDetailsPaymentsGlobal(
        concepts,
        ObjetoImpEnum.SíObjetoDeImpuesto,
      );

      const wayPayment = await this.service.getWayPayment(concepts);

      const branchOffice = await this.branchOffice.findBranch(
        query.branchOfficeId,
      );

      const branchOfficeConfig = await this.branchOfficeSettingService.findOne({
        where: { id: query.branchOfficeId },
      });

      let invoice = await this.service.getGlobalInvoice(
        branchOffice,
        branchOfficeConfig,
      );

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
        type: InvoiceModules.ACADEMY,
        TipoDeComprobante: TipoComprobanteEnum.I,
        Exportacion: ExportacionEnumMunyaal.E01,
        MetodoPago: MetodoPagoEnum.PUE,
        Moneda: MonedaEnum.MXN,
      });

      const uuid = timbrado.data.uuid.toUpperCase();

      await this.service.updateStampingPayments(
        concepts.map((value: NotInvoiced) => value.p_id),
        uuid,
      );

      invoice.uuid = uuid;
      invoice.status = 1;
      invoice.total = timbrado.Total;

      invoice = await this.academyChargeInvoiceService.updateInvoice(invoice);

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

  @Get('/academy-income-report')
  @UsePipes(ValidationPipe)
  async academyIncomeReport(@Query() query: AcademyIncomeReportQuery) {
    try {
      const { startDate, endDate } = query;
      const { rows, matriz } = await this.service.academyIncomeReport(query);

      const excel = new ExcelIncomeAcademy(rows, matriz);

      const filename = `Reporte_Ingresos_Academia_${moment(startDate).format(
        'YYYY_MM_DD',
      )}_${moment(endDate).format('YYYY_MM_DD')}.xlsx`;

      const buffer = await excel.getWorkBook().xlsx.writeBuffer({
        filename,
      });

      const report = {
        src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
          buffer,
        ).toString('base64')}`,
        type: 'excel',
        name: filename,
      };

      return {
        data: { rows, matriz },
        report,
      };
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Hubo un error al generar el reporte');
    }
  }

  @Public()
  @Get('/report-academia-payment')
  private async reportAcademiaPayment(
    @Res() res: Response,
    @Query() options: IQueryReportAcademiaPayment,
  ) {
    const obj = getDataFullMatrizAndData(
      await this.service.reportAcademiaPayment(options),
      InvoiceModules.ACADEMY,
      false,
      options.status != null ? parseInt(`${options.status}`) : 0,
    );

    let dataByClient = [];

    if (options.byClient) {
      dataByClient = reportPaymentByClient(obj.data);
    }

    if (options?.isExported) {
      const conceptStatusExcel = new PaymentExcel(
        options,
        options.byClient ? dataByClient : obj.data,
        obj.matriz,
        InvoiceModules.ACADEMY,
        'Pagos',
      );
      const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
        filename: `Ac_Pagos_${
          getRangeDates(options.startDate, options.endDate).excel
        }.xlsx`,
      });
      const report = {
        src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
          buffer,
        ).toString('base64')}`,
        type: 'excel',
        name: `Ac_Pagos_${
          getRangeDates(options.startDate, options.endDate).excel
        }`,
      };
      return res.send({
        report,
        data: options.byClient ? dataByClient : obj.data,
        obj,
      });
    } else {
      return res.send({
        report: false,
        data: options.byClient ? dataByClient : obj.data,
        obj,
      });
    }
  }

  @Public()
  @Get('/report-academia-payment-invoice')
  private async reportAcademiaPaymentInvoice(
    @Res() res: Response,
    @Query() options: IQueryReportAcademiaPayment,
  ) {
    const obj = getDataFullMatrizAndData(
      await this.service.reportAcademiaPaymentInvoice(options),
      InvoiceModules.ACADEMY,
      true,
      options.status != null ? parseInt(`${options.status}`) : 0,
    );

    let dataByClient = [];

    if (options.byClient) {
      dataByClient = reportPaymentByClient(obj.data);
    }

    if (options?.isExported) {
      const conceptStatusExcel = new PaymentExcel(
        options,
        options.byClient ? dataByClient : obj.data,
        obj.matriz,
        InvoiceModules.ACADEMY,
        'Pagos Facturados',
      );
      const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
        filename: `Ac_Pagos_facturados_${
          getRangeDates(options.startDate, options.endDate).excel
        }.xlsx`,
      });
      const report = {
        src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
          buffer,
        ).toString('base64')}`,
        type: 'excel',
        name: `Ac_Pagos_facturados_${
          getRangeDates(options.startDate, options.endDate).excel
        }`,
      };
      return res.send({
        report,
        data: options.byClient ? dataByClient : obj.data,
        obj,
      });
    } else {
      return res.send({
        report: false,
        data: options.byClient ? dataByClient : obj.data,
        obj,
      });
    }
  }

  @Get('/details-invoice')
  async detailsInvoiceByUuid(@Query() params: { uuid: string }, @Res() res) {
    try {
      const result = await this.service.detailsInvoiceByUuid(params);
      const invoice = await this.academyChargeInvoiceService.findOne({
        where: {
          uuid: params.uuid,
        },
        relations: ['agentCanceling', 'agentBilling'],
      });
      if (result) {
        const chargesDetails = [];
        let folio = '';
        result.forEach((p, index) => {
          chargesDetails.push(
            ...p.academyCharge.chargesDetails.map((s) => {
              return {
                ...s,
                academyCharge: {
                  id: p.academyCharge.id,
                  folio: p.academyCharge.folio,
                  chargesPayments: { id: p.id, folio: p.folio },
                },
              };
            }),
          );
          folio =
            index == 0
              ? p.academyCharge.folio
              : `${folio}, ${p.academyCharge.folio}`;
        });
        const obj: AcademyChargeInvoice = {
          ...invoice,
          agentBilling: invoice.agentBilling,
          agentCanceling: invoice.agentCanceling,
          academyCharge: {
            id: 0,
            folio,
            chargesDetails,
          } as AcademyCharge,
          academyChargePayment: {
            change: 0,
            createdAt: invoice.createdAt,
            dateCancellation: invoice.cancellationDate,
            deletedAt: invoice.deletedAt,
            folio: 'N/A',
            globalUuid: params.uuid,
            id: 0,
            cashierChargeCancellation: invoice.agentCanceling,
            observations: '',
            paymentStatus: 2,
            quantity: parseFloat(invoice.total),
            isIVA: true,
            stamping: 1,
            updatedAt: invoice.updatedAt,
            uuid: params.uuid,
            reasonCancellation: invoice.reasonCancellation,
          } as AcademyChargePayments,
        } as AcademyChargeInvoice;
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
          details: e,
        },
      });
    }
  }
}
