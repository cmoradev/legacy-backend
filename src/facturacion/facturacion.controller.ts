import { Controller, Get } from '@nestjs/common';
import { FacturacionModerna } from '../common/FacturacionModerna';

@Controller('facturacion')
export class FacturacionController {
  @Get('/')
  async index() {
    const url: string = 'https://t1demo.facturacionmoderna.com/timbrado/wsdl';
    const option = {
      'UserPass': 'b9ec2afa3361a59af4b4d102d3f704eabdf097d4',
      'UserID': 'UsuarioPruebasWS',
      'emisorRFC': 'TCM970625MB1',
    };
    const fb = new FacturacionModerna(url, option);
    await fb.consultarSaldo();
    return 'amir';
  }
}
