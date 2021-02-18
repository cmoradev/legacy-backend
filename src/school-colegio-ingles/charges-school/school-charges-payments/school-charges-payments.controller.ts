import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargePayment } from './entities/school-charge-payment.entity';
import { SchoolChargesPaymentsService } from './school-charges-payments.service';
import { QuerySchoolPaymentBilling } from '../../school-payments/interfaces/InvoiceSchoolPayment.interface';
import { ConceptsPriceByPaymentBilligAS } from '../../../common/point-of-sale/school-college-point-of-sale';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { SchoolChargesInvoiceService } from '../school-charges-invoice/school-charges-invoice.service';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import {
  GenerateInvoice,
  GenerateInvoiceIedu,
} from '../../../mini-store/store-sales/mini-store-sales-payments/utils/generateInvoice';
import { XmlCdfi } from '@signati/core';
import { PDF, XmlToJson } from '@signati/pdf';
import { User } from '../../../system/users/entities/user.entity';
import { FactSw, StampV4 } from '../../../webService/FactSw';
import { SchoolChargesInvoice } from '../school-charges-invoice/entities/school-charges-invoice.entity';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { Response } from 'express';
import { QuerySimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { convertPaymentsReportCollege } from './reports/payments.util';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
import { ConfigService } from '../../../config/config.service';

@UseGuards(JwtGuard)
@Crud({
  model: {
    type: SchoolChargePayment,
  },
  query: {
    limit: 200,
    join: {
      schoolCharge: {},
      'schoolCharge.schoolStudent': { alias: 'schoolStudent' },
      paymentStatus: {},
      methodsPayments: {},
      cashierCharge: {},
      cashierChargeCancellation: {},
      schoolChargesInvoice: {},
    },
  },
})
@Controller()
export class SchoolChargesPaymentsController implements CrudController<SchoolChargePayment> {
  constructor(
    readonly service: SchoolChargesPaymentsService,
    readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
    readonly schoolChargeInvoiceService: SchoolChargesInvoiceService,
    readonly branchOffice: BranchOfficeService,
    readonly branchOfficeSettingService: BranchOfficeSettingService,
    private  smartWeb: FactSw,
    private readonly configService: ConfigService,
  ) {
  }

  get base(): CrudController<SchoolChargePayment> {
    return this;
  }

  @Post('/billing')
  async billing(@Body() query: QuerySchoolPaymentBilling, @Res() response) {
    const result = await this.service.findSaleByPayment(query);
    const invoiceDetails = ConceptsPriceByPaymentBilligAS(result.payment, result.charge.chargesDetails);
    const currentOffice = await this.branchOffice.findBranch(query.branchOfficeId);
    const branchOfficeSett = await this.branchOfficeSettingService.findOne({
      where: {
        id: query.branchOfficeSettingId,
      },
    });
    const invoiceFinded = await this.schoolChargeInvoiceService.findInvoiceByPayment({
      paymentId: query.chargePaymentId,
      status: StatusInvoce.noBilling,
    });
    const invoiceResponse = {
      stamping: false,
      msg: '',
      invoice: {},
      uuid: '',
    };
    try {
      const logo = readFileSync(`${ this.configService.getPath() }logos/colegiologo.png`);
      if (invoiceFinded) {
        if (invoiceFinded.schoolChargePayment.stamping === 1) {
          console.log('1');
          const invoicePayment = await this.schoolChargeInvoiceService.findInvoiceByPayment({
            paymentId: query.chargePaymentId,
            status: StatusInvoce.invoiced,
            stamping: 1,
          });
          invoiceResponse.stamping = true;
          invoiceResponse.invoice = invoicePayment;
          invoiceResponse.msg = 'PAGO FACTURADO';
          invoiceResponse.uuid = invoicePayment.uuid;
          response.send(invoiceResponse);
        } else {
          let timbrado: StampV4;
          if (query.usoCfdi.value === 'D10') {
            const xml = await GenerateInvoiceIedu(
              {
                folio: invoiceFinded.folio,
                serie: branchOfficeSett.serieFacturacion,
              },
              result.highestPayment.codePaymentMethod,
              branchOfficeSett,
              {
                Nombre: query.receiver.businessName,
                Rfc: query.receiver.rfc,
                UsoCFDI: query.usoCfdi.value,
              },
              {
                version: '1.0',
                autRVOE: query.studyPlan.code,
                CURP: query.student.curp,
                nivelEducativo: query.studyPlan.level.name.toString(),
                nombreAlumno: `${ query.student.name } ${ query.student.lastNameFather } ${ query.student.lastNameMother }`,
                rfcPago: query.receiver.rfc,
              },
              invoiceDetails,
              this.configService.getPath(),
            );
            timbrado = await this.smartWeb.facturar(xml);
          } else {
            const xml = await GenerateInvoice(
              {
                folio: invoiceFinded.folio,
                serie: branchOfficeSett.serieFacturacion,
              },
              result.highestPayment.codePaymentMethod,
              branchOfficeSett,
              {
                Nombre: query.receiver.businessName,
                Rfc: query.receiver.rfc,
                UsoCFDI: query.usoCfdi.value,
              },
              invoiceDetails,
              this.configService.getPath(),
              0
            );
            timbrado = await this.smartWeb.facturar(xml);
          }
          await this.service.updatePayment({
            id: query.chargePaymentId,
            stamping: 1,
          } as SchoolChargePayment);
          // Guardamos el xml
          const pathXml = `${ this.configService.getPath() }comprobantes/colegio/` + timbrado.data.uuid.toUpperCase() + '.xml';
          // console.log(pathXml, timbrado);
          fs.writeFileSync(pathXml, timbrado.data.cfdi);
          // Obtenemos los datos del xml
          const cfdi: XmlCdfi = await XmlToJson(pathXml);
          // 4. Actualizamos los campos con la factura los datos del sat
          invoiceFinded.uuid = timbrado.data.uuid.toUpperCase();
          invoiceFinded.status = 1;
          invoiceFinded.total = +cfdi['cfdi:Comprobante']._attributes.Total;
          const resultInvoice = await this.schoolChargeInvoiceService.updateInvoice(invoiceFinded);
          // Generamos el PDf del xml
          const pdf = new PDF(pathXml, 0, {
            lugarExpedicion: branchOfficeSett.address,
            logo: `data:image/png;base64, ${ logo.toString('base64') }`,
          });
          // console.log(pdf);
          await pdf.save(`${ this.configService.getPath() }comprobantes/colegio/` + timbrado.data.uuid.toUpperCase());
          // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
          this.schoolChargeInvoiceService.sendMail(currentOffice, timbrado.data.uuid, query.receiver.email);
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
        const invoice = await this.schoolChargeInvoiceService.saveInvoice(factura);
        if (invoice) {
          let timbrado: StampV4;
          if (query.usoCfdi.value === 'D10') {
            const xml = await GenerateInvoiceIedu(
              {
                folio: invoice.folio,
                serie: branchOfficeSett.serieFacturacion,
              },
              result.highestPayment.codePaymentMethod,
              branchOfficeSett,
              {
                Nombre: query.receiver.businessName,
                Rfc: query.receiver.rfc,
                UsoCFDI: query.usoCfdi.value,
              },
              {
                version: '1.0',
                autRVOE: query.studyPlan.code,
                CURP: query.student.curp,
                nivelEducativo: query.studyPlan.level.name.toString(),
                nombreAlumno: `${ query.student.name } ${ query.student.lastNameFather } ${ query.student.lastNameMother }`,
                rfcPago: query.receiver.rfc,
              },
              invoiceDetails,
              this.configService.getPath());
            timbrado = await this.smartWeb.facturar(xml);
          } else {
            const xml = await GenerateInvoice(
              {
                folio: invoice.folio,
                serie: branchOfficeSett.serieFacturacion,
              },
              result.highestPayment.codePaymentMethod,
              branchOfficeSett,
              {
                Nombre: query.receiver.businessName,
                Rfc: query.receiver.rfc,
                UsoCFDI: query.usoCfdi.value,
              },
              invoiceDetails,
              this.configService.getPath(),
              0
            );
            timbrado = await this.smartWeb.facturar(xml);
          }
          await this.service.updatePayment({
            id: query.chargePaymentId,
            stamping: 1,
          } as SchoolChargePayment);
          // Guardamos el xml
          const pathXml = `${ this.configService.getPath() }/comprobantes/colegio/` + timbrado.data.uuid.toUpperCase() + '.xml';
          fs.writeFileSync(pathXml, timbrado.data.cfdi);
          // Obtenemos los datos del xml
          const cfdi: XmlCdfi = await XmlToJson(pathXml);
          // 4. Actualizamos los campos con la factura los datos del sat
          invoice.uuid = timbrado.data.uuid.toUpperCase();
          invoice.status = 1;
          invoice.total = +cfdi['cfdi:Comprobante']._attributes.Total;
          const resultInvoiceFirst = await this.schoolChargeInvoiceService.updateInvoice(invoice);
          // Generamos el PDf del xml
          const pdf = new PDF(pathXml, 0, {
            lugarExpedicion: branchOfficeSett.address,
            logo: `data:image/png;base64, ${ logo.toString('base64') }`,
          });
          // console.log(pdf);
          await pdf.save(`${ this.configService.getPath() }comprobantes/colegio/` + timbrado.data.uuid.toUpperCase());
          // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
          await this.schoolChargeInvoiceService.sendMail(currentOffice, timbrado.data.uuid, query.receiver.email);
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
      response.status(400).send(e);
    }
  }

  @Get('/simple-report')
  async simpleReport(@Req() request, @Res() response: Response, @Query() query: QuerySimpleReport) {
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
      res.file = await this.service.simpleReport(payments, charges, query, { base64: true });
    } else {
      const cashiers = await this.service.getUserCasher();
      const paymenMethods = await this.invoiceMethodsPaymentsService.repo.find({
        where: {
          showReport: true,
          isActive: true,
        },
      });
      const viewPayments = convertPaymentsReportCollege(payments, cashiers, paymenMethods);
      res.payments = viewPayments;
    }
    return response.send(res);
  }
}
