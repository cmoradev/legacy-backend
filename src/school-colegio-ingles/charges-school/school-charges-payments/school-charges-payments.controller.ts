import {
  Body,
  Controller,
  Get, NotFoundException,
  Post,
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
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { SchoolChargesInvoiceService } from '../school-charges-invoice/school-charges-invoice.service';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import {
  GenerateGlobalInvoice,
  GenerateInvoiceIedu,
} from '../../../common/utils/invoice/generator/generateInvoice';
import { FormaPago, RegimenFiscalList } from '@signati/core';
import { PDF, XmlToJson } from '@signati/pdf';
import { User } from '../../../system/users/entities/user.entity';
import { FactSw, StampV4 } from '../../../webService/FactSw';
import { SchoolChargesInvoice } from '../school-charges-invoice/entities/school-charges-invoice.entity';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { Response } from 'express';
import { QuerySimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { convertPaymentsReportCollege, getDataMatrizPaymentSchool, getMatrizPaymentSchool } from './reports/payments.util';
import { ConfigService } from '../../../common/config/config.service';
import { A117 } from '../../../pdf/A117/desing/A117';
import { Recibo } from '../../../common/pdfmake/Recibo';
import * as moment from 'moment';
import { StudentsService } from '../../students/students.service';
import { roundQuantity } from '../../../common/point-of-sale/point-of-sale';
import { Public } from '../../../common/docorators/public.decorator';
import { NotInvoicedDto } from '../../../common/dto/not-invoiced.dto';
import { NotInvoiced } from '../../../common/interface/not-invoiced.interface';
import { getDetailsPaymentsGlobal } from '../../../common/point-of-sale/utils';
import { ObjetoImpEnum } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import { Environment, InvoiceModules } from '../../../common/point-of-sale/types.pos';
import { ReciboDouble } from '../../../common/pdfmake/ReciboDouble';
import { ConceptsPriceByPaymentBilligCalculation } from '../../../common/calculations/calculation';
import {IQueryReportSchoolPayment} from './types/IReport';
import {SchoolPaymentExcel} from './reports/shoool-payment.excel';
import {getNameReport} from '../../../mini-store/store-sales/mini-store-sales/reports/helpers';
import {SchoolPaymentInvoiceExcel} from './reports/school-payment-invoice.excel';

@Crud({
  model: {
    type: SchoolChargePayment,
  },
  query: {
    limit: 10,
    join: {
      schoolCharge: {eager: false},
      'schoolCharge.schoolStudent': { alias: 'schoolStudent', eager: false },
      paymentStatus: {eager: false},
      methodsPayments: {eager: false},
      cashierCharge: {eager: false},
      cashierChargeCancellation: {eager: false},
      schoolChargesInvoice: {eager: false},
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
  ) { }

  get base(): CrudController<SchoolChargePayment> {
    return this;
  }

  @Post('/receipt')
  async billingGet(@Body() query: QuerySchoolPaymentBilling, @Res() res) {
    const error: any[] = []
    try {
      // query.chargeId = 335;
      // query.chargePaymentId = 344;
      // query.branchOfficeId = 1;
      // query.branchOfficeSettingId = 1;
      // query.student = {
      //   id: 1,
      // } as Student;
      const student = query.student;
      const result = await this.service.findSaleByPayment(query);
      // const currentOffice = await this.branchOffice.findBranch(query.branchOfficeId);
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
        typeConcept: 'Recepit'
      });

      const logo = readFileSync(
        `${this.configService.getPath()}logos/colegiologo.png`,
      );
      const Receip = new Recibo();
      Receip.setType(InvoiceModules.SCHOOL)
      Receip.addLogo({
        width: 100,
        height: 100,
        image: `data:image/png;base64, ${logo.toString('base64')}`,
      }) == false ? error.push(`error al agregar el logo`): null;
      Receip.addFolio(result.payment.folio) == false ? error.push(`error al agregar el folio`): null;
      Receip.addDate(moment(result.payment.createdAt).format('YYYY-MM-DD')) == false ? error.push(`error al agregar la fecha`): null;
      const regimen = RegimenFiscalList.find(
        (f) => f.value === branchOfficeSett.regime,
      );
      if (regimen == undefined){
        error.push(`error: no se encontro el regimen fiscal del modulo, valide su configuración`)
      }else{
        Receip.addEmisor({
          name: branchOfficeSett.businessName,
          rfc: branchOfficeSett.rfc,
          regimen:
            branchOfficeSett.regime + ' - ' + regimen !== undefined ? regimen!.descripcion.toUpperCase() : '',
          expedido: branchOfficeSett.address,
        }) == false ? error.push(`error al agregar los datos del emisor`): null;
      }
      const name = `${student.name} ${student.lastNameFather} ${student.lastNameMother} `;
      Receip.addReceptor({
        name,
        curp: student.curp ? student.curp : '',
        matricula: student.matricula,
        type: InvoiceModules.SCHOOL
      }) == false ? error.push(`error al agregar los datos del receptor`): null;

      const ven =
        result.payment.cashierCharge.name +
        ' ' +
        result.payment.cashierCharge.lastnameFather +
        ' ' +
        result.payment.cashierCharge.lastnameMother;

      Receip.addInformacion({
        vendedor: ven,
      }) == false ? error.push(`error al agregar los datos del vendedor`): null;
      Receip.addCatidad({
        ...invoiceDetails.totals.receipt
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
        error,
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
        typeConcept: 'Recepit'
      });
      const logo = readFileSync(
        `${this.configService.getPath()}logos/colegiologo.png`,
      );
      const Receip = new ReciboDouble();
      Receip.addLogo({
        width: 100,
        height: 100,
        image: `data:image/png;base64, ${logo.toString('base64')}`,
      });
      Receip.addFolio(result.charge.folio);
      Receip.addFolio2(result.charge.folio);
      Receip.addDate(moment(result.charge.createdAt).format('YYYY-MM-DD'));
      Receip.addDate2(moment(result.charge.createdAt).format('YYYY-MM-DD'));
      const regimen = RegimenFiscalList.find(
        (f) => f.value === branchOfficeSett.regime,
      );
      Receip.addEmisor({
        name: branchOfficeSett.businessName,
        rfc: branchOfficeSett.rfc,
        regimen:
          branchOfficeSett.regime + ' - ' + regimen!.descripcion.toUpperCase(),
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
        ...invoiceDetails.totals.receipt
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
      const logo = readFileSync(
        `${this.configService.getPath()}logos/colegiologo.png`,
      );
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
          let timbrado: StampV4;
          const xml = await GenerateInvoiceIedu(
            {
              ...invoiceDetails,
              folio: invoiceFinded.folio,
              serie: branchOfficeSett.serieFacturacion,
              codigoFormaPago: result.highestPayment.codePaymentMethod as FormaPago,
              emisor: branchOfficeSett,
              receptor,
              informacionGlobal: query.informacionGlobal,
              student,
              env,
            });
          timbrado = await this.smartWeb.facturar(xml);

          await this.service.updatePayment({
            id: query.chargePaymentId,
            stamping: 1,
          } as SchoolChargePayment);
          // Guardamos el xml
          const pathXml =
            `${this.configService.getPath()}comprobantes/colegio/` +
            timbrado.data.uuid.toUpperCase() +
            '.xml';
          fs.writeFileSync(pathXml, timbrado.data.cfdi);
          // Obtenemos los datos del xml
          const cfdi = await XmlToJson(pathXml);
          // 4. Actualizamos los campos con la factura los datos del sat
          invoiceFinded.uuid = timbrado.data.uuid.toUpperCase();
          invoiceFinded.status = 1;
          invoiceFinded.total = +cfdi['cfdi:Comprobante']._attributes.Total;
          const resultInvoice = await this.schoolChargeInvoiceService.updateInvoice(
            invoiceFinded,
          );
          // Generamos el PDf del xml
          const desingpdf = new A117(pathXml, {
            lugarExpedicion: branchOfficeSett.address,
            logo: `data:image/png;base64, ${logo.toString('base64')}`,
          });
          const pdf = new PDF<A117>(desingpdf);
          await pdf.save(
            `${this.configService.getPath()}comprobantes/colegio/` +
            timbrado.data.uuid.toUpperCase(),
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
          let timbrado: StampV4;
          const xml = await GenerateInvoiceIedu(
            {

              ...invoiceDetails,
              folio: invoice.folio,
              serie: branchOfficeSett.serieFacturacion,
              codigoFormaPago: result.highestPayment.codePaymentMethod as FormaPago,
              emisor: branchOfficeSett,
              receptor,
              informacionGlobal: query.informacionGlobal,
              student,
              env,
            });
          timbrado = await this.smartWeb.facturar(xml);

          await this.service.updatePayment({
            id: query.chargePaymentId,
            stamping: 1,
          } as SchoolChargePayment);
          // Guardamos el xml
          const pathXml =
            `${this.configService.getPath()}/comprobantes/colegio/` +
            timbrado.data.uuid.toUpperCase() +
            '.xml';
          fs.writeFileSync(pathXml, timbrado.data.cfdi);
          // Obtenemos los datos del xml
          const cfdi = await XmlToJson(pathXml);
          // 4. Actualizamos los campos con la factura los datos del sat
          invoice.uuid = timbrado.data.uuid.toUpperCase();
          invoice.status = 1;
          invoice.total = +cfdi['cfdi:Comprobante']._attributes.Total;
          const resultInvoiceFirst = await this.schoolChargeInvoiceService.updateInvoice(
            invoice,
          );
          // Generamos el PDf del xml
          const desingpdf = new A117(pathXml, {
            lugarExpedicion: branchOfficeSett.address,
            logo: `data:image/png;base64, ${logo.toString('base64')}`,
          });
          const pdf = new PDF<A117>(desingpdf);
          await pdf.save(
            `${this.configService.getPath()}comprobantes/colegio/` +
            timbrado.data.uuid.toUpperCase(),
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
  ){
    const result = await this.service.reportSchoolPayment(options);
    const dataMatriz = getDataMatrizPaymentSchool(result);
    const matriz = getMatrizPaymentSchool(dataMatriz.payments,dataMatriz.cashiers,dataMatriz.methodsPayments);
    const obj = {
      data: result,
      dataConverter: dataMatriz,
      matriz: matriz
    };
    if(options?.isExported) {
      const conceptStatusExcel = new SchoolPaymentExcel(options, result, {data: dataMatriz, matriz});
      const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
        filename: `${getNameReport('Pagos', options).excel}.xlsx`,
      });
      const report = {
        src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
            buffer,
        ).toString('base64')}`,
        type: 'excel',
        name: `${getNameReport('Pagos', options).excel}`,
      };
      return res.send({ report, data: obj });
    } else {
      return res.send({ report: false, data: obj });
    }
  }

  @Get('/report-school-payment-invoice')
  private async reportSchoolPaymentInvoice(
      @Res() res: Response,
      @Query() options: IQueryReportSchoolPayment,
  ){
    const result = await this.service.reportSchoolPaymentInvoice(options);
    const dataMatriz = getDataMatrizPaymentSchool(result);
    const matriz = getMatrizPaymentSchool(dataMatriz.payments,dataMatriz.cashiers,dataMatriz.methodsPayments);
    const obj = {
      data: result,
      dataConverter: dataMatriz,
      matriz: matriz
    };

    if(options?.isExported) {
      const conceptStatusExcel = new SchoolPaymentInvoiceExcel(options, result);
      const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
        filename: `${getNameReport('Pagos_Facturados', options).excel}.xlsx`,
      });
      const report = {
        src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
            buffer,
        ).toString('base64')}`,
        type: 'excel',
        name: `${getNameReport('Pagos_Facturados', options).excel}`,
      };
      return res.send({ report, data: obj });
    } else {
      return res.send({ report: false, data: obj });
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
        percentageTax: '0'
      });

      const stamping = await this.smartWeb.facturar(xml);

      const uuid = stamping.data.uuid.toUpperCase();

      await this.service.updateStampingPayments(concepts.map((value: NotInvoiced) => value.p_id), uuid);

      const cfdi = await this.service.saveXmlAndPdf(uuid, stamping.data.cfdi, branchOfficeConfig.address)

      invoice.uuid = uuid;
      invoice.status = 1;
      invoice.total = +cfdi._attributes.Total;

      invoice = await this.schoolChargeInvoiceService.updateInvoice(invoice);

      await this.schoolChargeInvoiceService.sendMail(branchOffice, uuid, branchOfficeConfig.email);

      response.status(200);
      response.send({
        uuid,
        invoice,
        stamping,
        concepts,
        msg: 'Factura global timbrada',
      });
    } catch (e) {
      console.log(e);
      response.status(400);
      response.send(e);
    }
  }

}
