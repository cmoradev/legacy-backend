import {
  Body,
  Controller,
  Delete,
  Get,
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
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { SchoolChargesInvoiceService } from '../school-charges-invoice/school-charges-invoice.service';
import { catRegimenFiscal } from '@munyaal/cfdi-catalogs';
import { FactSw } from '../../../webService/FactSw';
import { SchoolChargesInvoice } from '../school-charges-invoice/entities/school-charges-invoice.entity';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';
import { Response } from 'express';
import { QuerySimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { ConfigService } from '../../../common/config/config.service';
import { StudentsService } from '../../students/students.service';
import { Public } from '../../../common/docorators/public.decorator';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import {
  PaymentExtraCharge,
} from '../../../common/interface/not-invoiced.interface';
import {
  InvoiceModules,
} from '../../../common/point-of-sale/types.pos';
import { ConceptsPriceByPaymentBilligCalculation } from '../../../common/calculations/calculation';
import { IQueryReportSchoolPayment } from './types/IReport';
import {
  getNameReport,
  getRangeDates,
} from '../../../mini-store/store-sales/mini-store-sales/reports/helpers';
import { IQueryReportSaleTodayOp } from '../../../mini-store/store-sales/mini-store-sales/types/IReport';
import {
  dataFullSale,
  getDataFullMatrizAndData,
  PaymentExcel,
  reportPaymentByClient,
} from '../../../common/utils/report/index';
import { convertPaymentsReportCollege } from './reports/payments.util';
import { AttachmentsType } from '../../../types';
import { roundQuantity } from '../../../common/point-of-sale/point-of-sale';
import { ReciboDouble } from '../../../common/pdfmake/ReciboDouble';
import * as moment from 'moment';
import { CancellationDto } from '../../../common/dto/Cancellation.dto';
import { SalePaymentDto } from '../../../common/dto/sale-payment.dto';
import { S3Service } from 'src/common/storage/s3.service';
import { cfdiErrorToHttpException } from '../../../common/utils/invoice/cfdi-errors';
import { SchoolChargesPaymentsBillingService } from './school-charges-payments-billing.service';

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
      schoolCharge: { eager: false },
      'schoolCharge.schoolStudent': { alias: 'schoolStudent', eager: false },
      paymentStatus: { eager: false },
      methodsPayments: { eager: false },
      cashierCharge: { eager: false },
      cashierChargeCancellation: { eager: false },
      schoolChargesInvoice: { eager: false },
      //"schoolChargesInvoice.creditNotesSchool": { eager: false },
    },
  },
})
@Controller()
export class SchoolChargesPaymentsController
  implements CrudController<SchoolChargePayment> {

  constructor(
    readonly service: SchoolChargesPaymentsService,
    readonly serviceBilling: SchoolChargesPaymentsBillingService,
    readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
    readonly schoolChargeInvoiceService: SchoolChargesInvoiceService,
    readonly branchOffice: BranchOfficeService,
    readonly studentService: StudentsService,
    readonly branchOfficeSettingService: BranchOfficeSettingService,
    private _s3Service: S3Service
  ) {}

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
        typeConcept: 'Recepit',
      });

      const branchOfficeSett = await this.branchOfficeSettingService.findOne({
        where: {
          id: query.branchOfficeSettingId,
        },
      });

      const receipt = await this.service.createReceipt(
        result,
        branchOfficeSett,
        query.student,
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

  @Post('/billing')
  async billing(@Body() query: QuerySchoolPaymentBilling, @Res() response) {
    try {
      const result = await this.serviceBilling.processBilling(query);
      if (result.stamping) {
        response.send(result);
      } else {
        response.status(400).send(result);
      }
    } catch (e) {
      console.log(e);
      const exception = cfdiErrorToHttpException(e);
      response.status(exception.getStatus());
      response.send(exception.getResponse());
    }
  }

  @Post('/reconcile-pending')
  async reconcilePendingStamps(@Res() response) {
    try {
      const pendingInvoices = await this.service.invoiceRepository
        .createQueryBuilder('inv')
        .innerJoinAndSelect('inv.schoolChargePayment', 'pay')
        .where('inv.pendingStampUuid IS NOT NULL')
        .andWhere('inv.status = 0')
        .getMany();

      const results = [];

      for (const invoice of pendingInvoices) {
        try {
          // Intentar completar la actualización pendiente
          invoice.uuid = invoice.pendingStampUuid;
          invoice.status = 1;
          await this.schoolChargeInvoiceService.updateInvoice(invoice);

          await this.serviceBilling.updatePayment({
            id: invoice.schoolChargePayment.id,
            stamping: 1,
          } as any);

          invoice.pendingStampUuid = null;
          invoice.pendingStampAt = null;
          await this.schoolChargeInvoiceService.updateInvoice(invoice);

          results.push({
            invoiceId: invoice.id,
            uuid: invoice.uuid,
            status: 'recovered',
          });
        } catch (err) {
          // Verificar si pasaron más de 24 horas → limpiar para permitir reintentar
          const hoursSincePending = invoice.pendingStampAt
            ? (Date.now() - new Date(invoice.pendingStampAt).getTime()) / (1000 * 60 * 60)
            : Infinity;

          if (hoursSincePending > 24) {
            invoice.pendingStampUuid = null;
            invoice.pendingStampAt = null;
            await this.schoolChargeInvoiceService.updateInvoice(invoice);

            results.push({
              invoiceId: invoice.id,
              uuid: invoice.uuid,
              status: 'cleared_for_retry',
              message: 'Han pasado más de 24h, se limpia para reintentar',
            });
          } else {
            results.push({
              invoiceId: invoice.id,
              pendingUuid: invoice.pendingStampUuid,
              status: 'failed',
              message: err.message,
            });
          }
        }
      }

      response.send({
        total: pendingInvoices.length,
        results,
      });
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
        InvoiceModules.SCHOOL,
        'Pagos',
      );
      const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
        filename: `Sc_Pagos_${
          getRangeDates(options.startDate, options.endDate).excel
        }.xlsx`,
      });
      const report = {
        src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
          buffer,
        ).toString('base64')}`,
        type: 'excel',
        name: `Sc_Pagos_${
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

  @Get('/report-school-payment-invoice')
  private async reportSchoolPaymentInvoice(
    @Res() res: Response,
    @Query() options: IQueryReportSchoolPayment,
  ) {
    const obj = getDataFullMatrizAndData(
      await this.service.reportSchoolPaymentInvoice(options),
      InvoiceModules.SCHOOL,
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
        InvoiceModules.SCHOOL,
        'Pagos Facturados',
      );
      const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
        filename: `Sc_Pagos_facturados_${
          getRangeDates(options.startDate, options.endDate).excel
        }.xlsx`,
      });
      const report = {
        src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
          buffer,
        ).toString('base64')}`,
        type: 'excel',
        name: `Sc_Pagos_facturados_${
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

  @Get('report-sale-school')
  private async reportSaleSchool(
    @Res() res,
    @Query() options: IQueryReportSaleTodayOp,
  ) {
    const result = await this.service.reportSalesSchool(options);
    let data: PaymentExtraCharge[] = dataFullSale(
      result,
      InvoiceModules.SCHOOL,
    );
    let dataByClient = [];

    if (options.byClient) {
      dataByClient = reportPaymentByClient(data);
    }

    if (options?.isExported) {
      const conceptStatusExcel = new PaymentExcel(
        options,
        options.byClient ? dataByClient : data,
        [],
        InvoiceModules.SCHOOL,
        'Ventas',
      );
      const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
        filename: `${
          getNameReport(
            options.byClient ? 'Ventas_por_cliente' : 'Ventas',
            options,
          ).excel
        }.xlsx`,
      });
      const report = {
        src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
          buffer,
        ).toString('base64')}`,
        type: 'excel',
        name: `${
          getNameReport(
            options.byClient ? 'Ventas_por_cliente' : 'Ventas',
            options,
          ).excel
        }`,
      };
      return res.send({ report, data: options.byClient ? dataByClient : data });
    } else {
      return res.send({
        report: false,
        data: options.byClient ? dataByClient : data,
      });
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
      const result = await this.serviceBilling.processGlobalBilling(query);
      response.status(200);
      response.send(result);
    } catch (e) {
      console.error(e);
      const exception = cfdiErrorToHttpException(e);
      response.status(exception.getStatus());
      response.send(exception.getResponse());
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
        relations: ['agentCanceling', 'agentBilling'],
      });
      if (result) {
        const chargesDetails = [];
        let folio = '';
        result.forEach((p, index) => {
          chargesDetails.push(
            ...p.schoolCharge.chargesDetails.map((s) => {
              return {
                ...s,
                schoolCharge: {
                  id: p.schoolCharge.id,
                  folio: p.schoolCharge.folio,
                  chargesPayments: { id: p.id, folio: p.folio },
                },
              };
            }),
          );
          folio =
            index == 0
              ? p.schoolCharge.folio
              : `${folio}, ${p.schoolCharge.folio}`;
        });
        const obj: SchoolChargesInvoice = {
          ...invoice,
          agentBilling: invoice.agentBilling,
          agentCanceling: invoice.agentCanceling,
          schoolCharge: {
            id: 0,
            folio,
            chargesDetails,
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
            observations: '',
            paymentStatus: 2,
            quantity: invoice.total,
            stamping: 1,
            updatedAt: invoice.updatedAt,
            uuid: params.uuid,
            reasonCancellation: invoice.reasonCancellation,
          } as SchoolChargePayment,
        } as SchoolChargesInvoice;
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
        typeConcept: 'Recepit',
      });

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
        query.student,
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

  @Post('/receipt-double')
  async billingDoubleGet(@Body() query: QuerySchoolPaymentBilling, @Res() res) {
    try {
      const student = query.student;
      const result = await this.service.findSaleByPayment(query);
      const branchOfficeSett = await this.branchOfficeSettingService.findOne({
        where: {
          id: query.branchOfficeSettingId,
        },
      });

      const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
        payment: result.payment,
        details: result.charge.chargesDetails,
        type: InvoiceModules.SCHOOL,
        ivaDefault: 1,
        ivaByDetail: 0,
        typeConcept: 'Recepit',
      });

      const Receip = new ReciboDouble();

      const logo = await this._s3Service.getLogo('logos/colegiologo.png');

      if (logo) {
        Receip.addLogo({
          width: 100,
          height: 100,
          image: `data:image/png;base64, ${logo.toString('base64')}`,
        });
      }

      Receip.addFolio(result.charge.folio);
      Receip.addFolio2(result.charge.folio);
      Receip.addDate(moment(result.charge.createdAt).format('YYYY-MM-DD'));
      Receip.addDate2(moment(result.charge.createdAt).format('YYYY-MM-DD'));
      const regimen = catRegimenFiscal.find(
        (f) => f.key === String(branchOfficeSett.regime),
      );
      Receip.addEmisor({
        name: branchOfficeSett.businessName,
        rfc: branchOfficeSett.rfc,
        regimen:
          branchOfficeSett.regime + ' - ' + regimen!.description.toUpperCase(),
        expedido: branchOfficeSett.address,
      });
      const name = `${student.name} ${student.lastNameFather} ${student.lastNameMother} `;
      Receip.addReceptor({
        name,
        curp: student.curp ? student.curp : '',
        matricula: student.matricula,
      });
      const ven =
        result.payment.cashierCharge.name +
        ' ' +
        result.payment.cashierCharge.lastnameFather +
        ' ' +
        result.payment.cashierCharge.lastnameMother;
      Receip.addInformacion({
        vendedor: ven,
      });

      Receip.addCatidad({
        ...invoiceDetails.totals.receipt,
      });
      Receip.addDetalles(invoiceDetails.concepts.conceptsSchoolAndAcademy);

      Receip.addNumberToLetter(+invoiceDetails.totals.receipt.Total);
      Receip.addObervations(result.payment.observations);
      const forma = result.payment.methodsPayments.map((m) => {
        return {
          forma: m.invoiceMethodPayment.name,
          cantidad: roundQuantity(m.quantity),
          banco: m.Bank ? m.Bank.name : '',
          cuenta: m.account,
          fecha: m.date,
        };
      });
      Receip.addFormaPago(forma);
      // await pdf.save('/home/misael/Documents/proyectos/amir')
      const download = Buffer.from(await Receip.getBase64(), 'base64');
      res.send({
        src: 'data:application/pdf;base64,' + (await Receip.getBase64()),
      });
    } catch (e) {
      res.send({
        error: e,
      });
    }
  }

  @Post('/:id/cancel')
  @UsePipes(ValidationPipe)
  async cancelPayment(
    @Param('id') id: string,
    @Body() payload: CancellationDto,
  ) {
    return this.service.cancelPayment(+id, payload);
  }

  @Post('add')
  @UsePipes(ValidationPipe)
  async addPayment(
    @Body() payload: SalePaymentDto,
  ): Promise<SchoolChargePayment> {
    return this.service.addPayment(payload);
  }
}
