import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';
import { MiniStoreInvoicesService } from './mini-store-invoices.service';
import { CancelInvoiceMinistoreDto } from './dto/cancel.invoice.ministore.dto';
import { FacturacionModerna } from '../../common/FacturacionModerna';

@Crud({
  model: {
    type: MiniStoreInvoice,
  },
  query: {
    join: {
      miniStoreSalePayment: {},
      miniStoreSale: {},
      agentBilling: {},
      agentCanceling: {},
    },
  },
})
@Controller()
export class MiniStoreInvoicesController implements CrudController<MiniStoreInvoice> {
  //  url: string = 'https://t2.facturacionmoderna.com/timbrado/wsdl';
  url: string = 'https://t1demo.facturacionmoderna.com/timbrado/wsdl';
  option = {
    'UserPass': 'b9ec2afa3361a59af4b4d102d3f704eabdf097d4',
    // 'UserPass': '4a63456b4d5113c4fdd8f9c9539295db37bb0982',
    // 'UserID': 'WSI1503194J6',
    'UserID': 'UsuarioPruebasWS',
    // 'emisorRFC': 'WSI1503194J6',
    // 'RFC': 'GUCE910701NHA',
  };

  constructor(
    readonly service: MiniStoreInvoicesService,
  ) {
  }

  get base(): CrudController<MiniStoreInvoice> {
    return this;
  }

  @Post('/cancelar')
  public async cancelInvoice(@Body() cancelInvoice: CancelInvoiceMinistoreDto, @Res() res: Response) {
    try {

      const factura = new FacturacionModerna(this.url, this.option, 1);
      const response = await factura.cancelar('TCM970625MB1', cancelInvoice.uuid);
      let status = 0;
      if (response.Code === 'GT05') {
        status = 2;
      }
      if (response.Code === 'GT11') {
        status = 3;
      }
      const obj = {
        id: cancelInvoice.idInvoice,
        status,
        idCancelingAgent: cancelInvoice.idAgentCanceling,
        reasonCancellation: cancelInvoice.reasonCancellation,
      };
      const invoice = await this.service.changeStautsInvoice(obj);
      const payment = await this.service.changeStautsPayment(cancelInvoice.idSalePayment, status);
      const objresult = {
        idinvoice: cancelInvoice.idInvoice,
        status,
        message: response.Message,
        invoiceMiniStore: invoice,
        payment,
      };
      res.status(200);
      res.send(objresult);
    } catch (e) {
      res.status(400);
      res.send(e.message);
    }
    /*
      * Nuevos estados para la factura:
      * 1. Facturado
      * 2.- Cancelado
      * 3.- En cola
      * 4.- Rechazado
      * */
  }

  @Post('/checkstatusinvoice')
  public CheckStatusInvoice() {
    return 'estatus';
  }

}
