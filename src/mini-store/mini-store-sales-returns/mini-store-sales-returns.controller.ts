import { Body, Controller, Post, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SalesReturns } from './entities/sales-returns.entity';
import { MiniStoreSalesReturnsService } from './mini-store-sales-returns.service';
import { InvoiceSaleReturnDto } from './dto/invoice-sale-return.dto';
import { CfdiClass, Concepto, Impuesto } from '@signati/sdk-node';
import { InvoiceCompanyService } from '../../invoice/invoice-company/invoice-company.service';
import { ivaAndFinalAmount, MultNumber } from '../../common/numbers';
import { add } from 'exact-math';
import { Response } from 'express';
import axios from 'axios';
import { DatosCfdi } from '@signati/sdk-node/lib/interfaces/cfdi.interface';
import { Concept } from '@signati/sdk-node/lib/interfaces/concepto.interface';
import { MiniStoreInvoicesService } from '../mini-store-invoices/mini-store-invoices.service';
import { InvoiceType } from '../mini-store-invoices/enums/invoice-type.enum';
import { MiniStoreInvoice } from '../mini-store-invoices/entities/mini-store-invoice.entity';
import { InvoicementStatusEnum } from '../mini-store-invoices/enums/invoicement-status.enum';

@Crud({
  model: {
    type: SalesReturns,
  },
  query: {
    join: {
      sale: {},
      details: {},
      agent: {},
      invoices: {},
      paymentMethod: {},
      'details.saleDetail': {},
      'details.saleDetail.miniStoreProduct': {},
    },
  },
})
@Controller()
export class MiniStoreSalesReturnsController implements CrudController<SalesReturns> {
  constructor(public service: MiniStoreSalesReturnsService,
              public serviceInvoiveMini: MiniStoreInvoicesService,
              public serviceInvoiceCompany: InvoiceCompanyService) {
  }

  get base(): CrudController<SalesReturns> {
    return this;
  }

  @Post('/facturar')
  async verifyregistration(@Body() dataToInvoice: InvoiceSaleReturnDto, @Res() res: Response): Promise<any> {
    const saleReturn = await this.service.getReturnDetails(dataToInvoice.idSaleReturn);
    // TODO hacer esto dinamico
    const company = await this.serviceInvoiceCompany.findCompany(3);
    let totalFactura = '0.00';
    let totalIva = '0.00';
    const a: DatosCfdi = {
      Serie: 'A',
      Folio: saleReturn.folio,
      // condicionesDePago: 'CONTADO',
      SubTotal: ivaAndFinalAmount(+saleReturn.amount).originalAmount,
      Descuento: '00.00',
      Moneda: 'MXN',
      Total: ivaAndFinalAmount(+saleReturn.amount).amountWithIva,
      TipoDeComprobante: 'E',
      FormaPago: saleReturn.paymentMethod.code,
      MetodoPago: 'PUE',
      LugarExpedicion: '77728',
    };
    const cfdi = new CfdiClass(a);
    cfdi.relacion({ UUID: dataToInvoice.uuidRelation, TipoRelacion: '03' });
    cfdi.emisor({
      Rfc: 'TCM970625M', // company.rfc,
      Nombre: company.businessName,
      RegimenFiscal: '601', // company.fiscalRegime,
    });
    cfdi.receptor({
      Rfc: dataToInvoice.receptorRfc,
      Nombre: dataToInvoice.receptor,
      UsoCFDI: dataToInvoice.usoCfdi,
    });
    for (const product of saleReturn.details) {
      const concept = new Concepto({
        ClaveProdServ: product.saleDetail.miniStoreProduct.storeInvoiceKey.key,
        //  NoIdentificacion: 'AULOG001',
        Cantidad: MultNumber(product.quantity, 1),
        ClaveUnidad: 'H87',
        Unidad: 'Pieza',
        Descripcion: product.saleDetail.miniStoreProduct.name,
        ValorUnitario: product.saleDetail.price,
        Importe: MultNumber(product.saleDetail.price, product.quantity),
        Descuento: '0.00',
      } as Concept);
      totalFactura = add(totalFactura, MultNumber(product.saleDetail.price, product.quantity));
      totalIva = add(totalIva, concept.getImpuestoImporte('0.160000'));
      concept.traslado({
        Base: concept.getImpuestoBase(),
        Impuesto: '002',
        TipoFactor: 'Tasa',
        TasaOCuota: '0.160000',
        Importe: concept.getImpuestoImporte('0.160000'),
      });
      cfdi.concepto(concept);
    }
    const impuesto = new Impuesto({ totalImpuestosTrasladados: totalIva });
    impuesto.traslados([{
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: totalIva,
    }]);
    cfdi.impuesto(impuesto);
    try {
      const cfdiObj = cfdi.getCfdi();
      const data: { uuid, total } = await axios.post('https://api.signati.io/timbrado/facturar', cfdiObj).then((res) => {
        return res.data;
      });

      this.serviceInvoiveMini.saveInvoice({
        folio: saleReturn.folio,
        uuid: data.uuid,
        total: data.total,
        businessName: dataToInvoice.receptor,
        rfc: dataToInvoice.receptorRfc,
        idBillingAgent: dataToInvoice.idUser,
        agentBilling: { id: dataToInvoice.idUser },
        idSale: saleReturn.sale.id,
        status: 1,
        miniStoreSale: {
          id: saleReturn.sale.id,
        },
        invoiceType: InvoiceType.expenses,
        idPlantel: 1,
        saleReturn: {
          id: dataToInvoice.idSaleReturn,
        },
      } as MiniStoreInvoice);
      await this.service.updateSaleReturn(dataToInvoice.idSaleReturn, InvoicementStatusEnum.billed);
      res.send(data);
    } catch (e) {
      res.send(e).status(400);
    }
  }
}
