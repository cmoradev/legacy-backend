import { Body, Controller, Post, Res } from '@nestjs/common';
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
import fs, { readFileSync } from 'fs';
import { GenerateInvoiceIedu } from '../../../mini-store/store-sales/mini-store-sales-payments/utils/generateInvoice';
import { XmlCdfi } from '@signati/core';
import { PDF, XmlToJson } from '@signati/pdf';
import { User } from '../../../system/users/entities/user.entity';
import { FactSw } from '../../../webService/FactSw';
import { SchoolChargesInvoice } from '../school-charges-invoice/entities/school-charges-invoice.entity';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';

@Crud({
  model: {
    type: SchoolChargePayment,
  },
  query: {
    limit: 200,
    join: {
      schoolCharge: {},
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
      const logo = readFileSync('/var/www/logos/colegiologo.png');
      if (invoiceFinded) {
        console.log('Factura encontrada === true', invoiceFinded);
        if (invoiceFinded.schoolChargePayment.stamping === 1) {
          console.log('PAGO FACTURADO')
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
            invoiceDetails);
          const timbrado = await this.smartWeb.facturar(xml);
          await this.service.updatePayment({
            id: query.chargePaymentId,
            stamping: 1,
          } as SchoolChargePayment);
          // Guardamos el xml
          const pathXml = '/var/www/pdc/comprobantes/academias/' + timbrado.data.uuid.toUpperCase() + '.xml';
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
            lugarExpedicion: 'CARRETERA FEDERAL CANCUN TULUM KM 292 MANZANA 24 LOTE 24 FRACCION 4 EJIDO PLAYA',
            logo: `data:image/png;base64, ${logo.toString('base64')}`,
          });
          await pdf.save('/var/www/pdc/comprobantes/colegio/' + timbrado.data.uuid.toUpperCase());
          // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
          // Todo metodo de enviar por correo
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
        const invoice = await this.schoolChargeInvoiceService.saveInvoice(factura);
        if (invoice) {
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
            invoiceDetails);
          const timbrado = await this.smartWeb.facturar(xml);
          // console.log(timbrado);
          await this.service.updatePayment({
            id: query.chargePaymentId,
            stamping: 1,
          } as SchoolChargePayment);
          // Guardamos el xml
          const pathXml = '/var/www/pdc/comprobantes/academias/' + timbrado.data.uuid.toUpperCase() + '.xml';
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
            lugarExpedicion: 'CARRETERA FEDERAL CANCUN TULUM KM 292 MANZANA 24 LOTE 24 FRACCION 4 EJIDO PLAYA',
            logo: `data:image/png;base64, ${logo.toString('base64')}`,
          });
          await pdf.save('/var/www/pdc/comprobantes/academias/' + timbrado.data.uuid.toUpperCase());
          // Enviamos correo al cliente con sus documentos fiscales (PDF y XML)
          // Todo metodo enviar por correo colegio

          // falta regresar el dato

          invoiceResponse.stamping = true;
          invoiceResponse.msg = 'Pago Facturado';
          invoiceResponse.invoice = resultInvoiceFirst;
          invoiceResponse.uuid = timbrado.data.uuid.toUpperCase();
          response.send(invoiceResponse);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}

