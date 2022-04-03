import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { FacturacionModerna } from 'invoice-modern';
import * as moment from 'moment-timezone';
import { OptionsFactMod } from 'invoice-modern/lib/interfaces/FactMod';
import { MiniStoreSalePayment } from '../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreSaleDetail } from '../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { AcademyChargeDetails } from '../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { AcademyChargePayments } from '../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { SchoolChargeDetails } from '../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
import { SchoolChargePayment } from '../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { Response } from 'express';
import { InvoiceModules } from '../common/point-of-sale/types.pos';
@Controller()
export class InvoiceController {
  @Get('/')
  async index() {

    // 'emisorRFC': 'WSI1503194J6',
    // 'RFC': 'GUCE910701NHA',

    const option: OptionsFactMod = {
      'UserPass': 'b9ec2afa3361a59af4b4d102d3f704eabdf097d4',
      // 'UserPass': '4a63456b4d5113c4fdd8f9c9539295db37bb0982',
      // 'UserID': 'WSI1503194J6',
      'UserID': 'UsuarioPruebasWS',
      debug: 1,
      develoment: true,
    };
    const factura = new FacturacionModerna(option);
    try {
      // const response = await factura.estadoCancelacion('GUCE910701NHAaa', 'HUMG701120PR6', '01C21358-B7A6-11E9-8116-59E18B88B8B7', '1840.01');
      // const response = await factura.cancelar('TCM970625MB1', '0A8DCD5A-FFEB-11E9-87C4-2307D22C084A');
      const fecha = moment().tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss');
      const res = await factura.timbrar({
        emisorRFC: 'TCM970625MB1',
        generarCBB: true,
        generarPDF: true,
        generarTXT: true,
        text2CFDI: this.generarLayout(fecha, 'TCM970625MB1'),
      });
      await factura.saveFile(res.xml, '/home/misael/Documentos/proyectos/nestjs/facturas/', `${res.uuid}.xml`);
      await factura.saveFile(res.pdf, '/home/misael/Documentos/proyectos/nestjs/facturas/', `${res.uuid}.pdf`);
      await factura.saveFile(res.png, '/home/misael/Documentos/proyectos/nestjs/facturas/', `${res.uuid}.png`);
      await factura.saveFile(res.txt, '/home/misael/Documentos/proyectos/nestjs/facturas/', `${res.uuid}.txt`);
      return res;
      // const response = await factura.consultarSaldo('WSI1503194J6');

      /*return {
        codigo: response.Code,
        mensaje: response.Message,
      };*/
    } catch (e) {
      return e.message;
    }
  }

  @Post('/price-by-payment')
  async priceByPayment(@Body() body: {
    type: InvoiceModules,
    payment: MiniStoreSalePayment | SchoolChargePayment | AcademyChargePayments,
    details: MiniStoreSaleDetail[] | SchoolChargeDetails[] | AcademyChargeDetails[]
  }, @Res() res: Response) {
    const { type } = body
    switch (type) {
      case InvoiceModules.ACADEMY:
        break;
      case InvoiceModules.SCHOOL:
        break;
      case InvoiceModules.STORE:
        // const factor = ConceptsPriceByPaymentBillig(miniStoreSalePayment, miniStoreSaleDetails);
        // const { detalles } = factor
        // // @ts-ignore
        // invoice.detalles = detalles
        // detalles.map((detalle) => {
        //   const findIndex = miniStoreSaleDetails.findIndex((mssd) => mssd.id === detalle.id)
        //   if (findIndex > -1) {
        //     // @ts-ignore
        //     miniStoreSaleDetails[findIndex].sat = detalle
        //   }
        // })
        break;
      default:
        break;
    }
    res.send({ data: [] })
  }

  private generarLayout(fecha, rfcEmisor) {
    return `[ComprobanteFiscalDigital]
Version=3.3
Serie=A
Folio=02
Fecha=${fecha}
FormaPago=03
NoCertificado=20001000000300022762
CondicionesDePago=CONTADO
SubTotal=1850
Descuento=175.00
Moneda=MXN
Total=1943.00
TipoDeComprobante=I
MetodoPago=PUE
LugarExpedicion=68050

[DatosAdicionales]
tipoDocumento=FACTURA
observaciones=Observaciones al documento versión 3.3
platillaPDF=clasic

[Emisor]
Rfc=${rfcEmisor}
Nombre=FACTURACION MODERNA SA DE CV
RegimenFiscal=601

[Receptor]
Rfc=XAXX010101000
Nombre=PUBLICO EN GENERAL
UsoCFDI=G01


[Concepto#1]
ClaveProdServ=01010101
NoIdentificacion=AULOG001
Cantidad=5
ClaveUnidad=H87
Unidad=Pieza
Descripcion=Aurriculares USB Logitech
ValorUnitario=350.00
Importe=1750.00
Descuento=175.00

Impuestos.Traslados.Base=[1575.00]
Impuestos.Traslados.Impuesto=[002]
Impuestos.Traslados.TipoFactor=[Tasa]
Impuestos.Traslados.TasaOCuota=[0.160000]
Impuestos.Traslados.Importe=[252.00]

[Concepto#2]
ClaveProdServ=43201800
NoIdentificacion=USB
Cantidad=1
ClaveUnidad=H87
Unidad=Pieza
Descripcion=Memoria USB 32gb marca Kingston
ValorUnitario=100.00
Importe=100.00

Impuestos.Traslados.Base=[100.00]
Impuestos.Traslados.Impuesto=[002]
Impuestos.Traslados.TipoFactor=[Tasa]
Impuestos.Traslados.TasaOCuota=[0.160000]
Impuestos.Traslados.Importe=[16.00]

[Traslados]
TotalImpuestosTrasladados=268.00
Impuesto=[002]
TipoFactor=[Tasa]
TasaOCuota=[0.160000]
Importe=[268.00]
`;

  }
}
