import { Controller, Get } from '@nestjs/common';
import { FacturacionModerna } from '../common/FacturacionModerna';
import * as moment from 'moment-timezone';

@Controller('facturacion')
export class FacturacionController {
  @Get('/')
  async index() {
    // const url: string = 'https://t2.facturacionmoderna.com/timbrado/wsdl';
    const url: string = 'https://t1demo.facturacionmoderna.com/timbrado/wsdl';

    const option = {
      'UserPass': 'b9ec2afa3361a59af4b4d102d3f704eabdf097d4',
      // 'UserPass': '4a63456b4d5113c4fdd8f9c9539295db37bb0982',
      // 'UserID': 'WSI1503194J6',
      'UserID': 'UsuarioPruebasWS',
      // 'emisorRFC': 'WSI1503194J6',
      // 'RFC': 'GUCE910701NHA',
    };
    const factura = new FacturacionModerna(url, option, 1);
    try {
      // const response = await factura.estadoCancelacion('GUCE910701NHAaa', 'HUMG701120PR6', '01C21358-B7A6-11E9-8116-59E18B88B8B7', '1840.01');
      // const response = await factura.cancelar('TCM970625MB1', '0A8DCD5A-FFEB-11E9-87C4-2307D22C084A');
      const fecha = moment().tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss');
      const response = await factura.timbrar({
        emisorRFC: 'TCM970625MB1',
        generarCBB: true,
        generarPDF: true,
        generarTXT: true,
        text2CFDI: this.generarLayout(fecha, 'TCM970625MB1'),
      });

      return response;
      // const response = await factura.consultarSaldo('WSI1503194J6');

      /*return {
        codigo: response.Code,
        mensaje: response.Message,
      };*/
    } catch (e) {
      return e.message;
    }
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
Descuento=1735.00
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
Importe=[268.00]`;

  }
}
