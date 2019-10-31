import { Controller, Get } from '@nestjs/common';
import { FacturacionModerna } from '../common/FacturacionModerna';

@Controller('facturacion')
export class FacturacionController {
  @Get('/')
  async index() {
    const url: string = 'https://t2.facturacionmoderna.com/timbrado/wsdl';
    const option = {
      'UserPass': '4a63456b4d5113c4fdd8f9c9539295db37bb0982',
      'UserID': 'WSI1503194J6',
      // 'emisorRFC': 'WSI1503194J6',
      // 'RFC': 'GUCE910701NHA',
    };
    const factura = new FacturacionModerna(url, option, 1);
    try {
      // const response = await factura.estadoCancelacion('GUCE910701NHAaa', 'HUMG701120PR6', '01C21358-B7A6-11E9-8116-59E18B88B8B7', '1840.01');
      const response = await factura.cancelar('TCM970625MB1', '01C21358-B7A6-11E9-8116-59E18B88B8B7' );
      return response;
    } catch (e) {
      return e.message;
    }
  }
}
