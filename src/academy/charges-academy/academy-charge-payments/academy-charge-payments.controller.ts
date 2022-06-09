import {
  Body,
  Controller,
  Delete,
  Get, NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargePaymentsService } from './academy-charge-payments.service';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';
import { QuerySimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { convertPaymentsReportAc } from './reports/payments.util';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
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
import { GenerateGlobalInvoice, GenerateInvoice } from '../../../common/utils/invoice/generator/generateInvoice';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import { FormaPago, XmlCdfi } from '@signati/core';
import { PDF, XmlToJson } from '@signati/pdf';
import { ConfigService } from '../../../common/config/config.service';
import { A117 } from '../../../pdf/A117/desing/A117';
import { Public } from '../../../common/docorators/public.decorator';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { NotInvoiced } from '../../../common/interface/not-invoiced.interface';
import { getDetailsPaymentsGlobal } from '../../../common/point-of-sale/utils';

import { ObjetoImpEnum } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import { MiniStoreInvoicesService } from '../../../mini-store/store-sales/mini-store-invoices/mini-store-invoices.service';
import { Environment, InvoiceModules } from '../../../common/point-of-sale/types.pos';
import { ConceptsPriceByPaymentBilligCalculation } from '../../../common/calculations/calculation';

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
export class AcademyChargePaymentsController
  implements CrudController<AcademyChargePayments> {
  private env: Environment = {
    instancePath: this.configService.getPath(),
    xslt: this.configService.getXsltPath()
  };
  constructor(
    readonly service: AcademyChargePaymentsService,
    readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
    readonly academyChargeInvoiceService: AcademyChargeInvoiceService,
    readonly branchOffice: BranchOfficeService,
    readonly branchOfficeSettingService: BranchOfficeSettingService,
    private smartWeb: FactSw,
    private readonly configService: ConfigService,
  ) { }

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
      const logo = readFileSync(
        `${this.configService.getPath()}logos/academiaslogo.png`,
      );
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
          const xml = await GenerateInvoice({
            ...invoiceDetails,
            folio: invoiceFind.folio,
            serie: branchOfficeSett.serieFacturacion,
            codigoFormaPago: result.highestPayment.codePaymentMethod as FormaPago,
            emisor: branchOfficeSett,
            informacionGlobal: query.informacionGlobal,
            receptor,
            env
          });
          const timbrado = await this.smartWeb.facturar(xml);
          await this.service.updatePayment({
            id: query.chargePaymentId,
            stamping: 1,
          } as AcademyChargePayments);
          // Guardamos el xml
          const pathXml =
            `${this.configService.getPath()}comprobantes/academias/` +
            timbrado.data.uuid.toUpperCase() +
            '.xml';
          fs.writeFileSync(pathXml, timbrado.data.cfdi);
          // Obtenemos los datos del xml
          const cfdi = await XmlToJson(pathXml);
          // 4. Actualizamos los campos con la factura los datos del sat
          invoiceFind.uuid = timbrado.data.uuid.toUpperCase();
          invoiceFind.status = 1;
          invoiceFind.total = cfdi['cfdi:Comprobante']._attributes.Total;
          const resultInvoice = await this.academyChargeInvoiceService.updateInvoice(
            invoiceFind,
          );
          // Generamos el PDf del xml
          const desingpdf = new A117(pathXml, {
            lugarExpedicion: branchOfficeSett.address,
            logo: `data:image/png;base64, ${logo.toString('base64')}`,
          });
          const pdf = new PDF<A117>(desingpdf);
          await pdf.save(
            `${this.configService.getPath()}comprobantes/academias/` +
            timbrado.data.uuid.toUpperCase(),
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
          const xml = await GenerateInvoice({
            ...invoiceDetails,
            folio: invoice.folio,
            serie: branchOfficeSett.serieFacturacion,
            codigoFormaPago: result.highestPayment.codePaymentMethod as FormaPago,
            emisor: branchOfficeSett,
            informacionGlobal: query.informacionGlobal,
            receptor,
            env
          });
          const timbrado = await this.smartWeb.facturar(xml);
          await this.service.updatePayment({
            id: query.chargePaymentId,
            stamping: 1,
          } as AcademyChargePayments);
          // Guardamos el xml
          const pathXml =
            `${this.configService.getPath()}comprobantes/academias/` +
            timbrado.data.uuid.toUpperCase() +
            '.xml';
          fs.writeFileSync(pathXml, timbrado.data.cfdi);
          // Obtenemos los datos del xml
          const cfdi = await XmlToJson(pathXml);
          // 4. Actualizamos los campos con la factura los datos del sat
          invoice.uuid = timbrado.data.uuid.toUpperCase();
          invoice.status = 1;
          invoice.total = cfdi['cfdi:Comprobante']._attributes.Total;
          const resultInvoiceFirst = await this.academyChargeInvoiceService.updateInvoice(
            invoice,
          );
          // Generamos el PDf del xml
          const desingpdf = new A117(pathXml, {
            lugarExpedicion: branchOfficeSett.address,
            logo: `data:image/png;base64, ${logo.toString('base64')}`,
          });
          const pdf = new PDF<A117>(desingpdf);
          await pdf.save(
            `${this.configService.getPath()}comprobantes/academias/` +
            timbrado.data.uuid.toUpperCase(),
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
      console.warn(e);
      res.status(400);
      res.send(e);
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
        where: { id: query.branchOfficeId }
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
      invoice.total = cfdi._attributes.Total;

      invoice = await this.academyChargeInvoiceService.updateInvoice(invoice);

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
