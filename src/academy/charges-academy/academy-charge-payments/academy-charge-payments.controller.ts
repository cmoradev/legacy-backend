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
import { AcademyChargePaymentsService } from './academy-charge-payments.service';
import { AcademyChargePaymentsBillingService } from './academy-charge-payments-billing.service';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';
import { QuerySimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { convertPaymentsReportAc } from './reports/payments.util';
import { QueryBillingAcademy } from './types/InvoiceAcademy.interface';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { AcademyChargeInvoiceService } from '../academy-charge-invoice/academy-charge-invoice.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { Response } from 'express';
import { AcademyChargeInvoice } from '../academy-charge-invoice/entities/academy-charge-invoice.entity';
import { AcademyCharge } from '../academy-charge/entities/academy-charge.entity';
import { ConfigService } from '../../../common/config/config.service';
import { Public } from '../../../common/docorators/public.decorator';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
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
import { AttachmentsType } from '../../../types';
import { CancellationDto } from '../../../common/dto/Cancellation.dto';
import { SalePaymentDto } from '../../../common/dto/sale-payment.dto';
import { S3Service } from 'src/common/storage/s3.service';

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
    readonly serviceBilling: AcademyChargePaymentsBillingService,
    readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
    readonly academyChargeInvoiceService: AcademyChargeInvoiceService,
    readonly branchOffice: BranchOfficeService,
    readonly branchOfficeSettingService: BranchOfficeSettingService,
    private readonly configService: ConfigService,
    private _s3Service: S3Service
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
    try {
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
        const paymenMethods = await this.invoiceMethodsPaymentsService.repo.find(
          {
            where: {
              showReport: true,
              isActive: true,
            },
          },
        );

        const viewPayments = convertPaymentsReportAc(
          payments,
          cashiers,
          paymenMethods,
        );
        result.payments = viewPayments;
      }

      response.send(result);
    } catch (e) {
      console.error(e);
      response.status(400).send({ message: 'No se puedo generar el reporte' });
    }
  }

  @Get('/time-change')
  async timeChange(@Req() request, @Res() response) {
    // await this.service.changeTime();
    response.send({ msj: 'finalizado' });
  }

  @Post('/billing')
  async billing(@Body() query: QueryBillingAcademy, @Res() res: Response) {
    try {
      const result = await this.serviceBilling.processBilling(query);
      if (result.stamping) {
        res.send(result);
      } else {
        res.status(400).send(result);
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
      const result = await this.serviceBilling.processGlobalBilling(query);
      response.status(200);
      response.send(result);
    } catch (e) {
      console.log(e);
      response.status(400);
      response.send(e);
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
  ): Promise<AcademyChargePayments> {
    return this.service.addPayment(payload);
  }
}
