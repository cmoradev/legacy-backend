import { Controller, Get } from '@nestjs/common';
import { FacturacionModerna } from '../common/FacturacionModerna';

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
      const response = await factura.cancelar('TCM970625MB1', '0A8DCD5A-FFEB-11E9-87C4-2307D22C084A');
      /*
      *
      * GT05: Cancelacion directa
      * GT11: Cancelacion con aceptacion de recepto
      *
      */
      // const response = await factura.consultarSaldo('WSI1503194J6');
      return {
        codigo: response.Code,
        mensaje: response.Message,
      };
    } catch (e) {
      return e.message;
    }
  }
}
