import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SalesReturns } from './entities/sales-returns.entity';
import { MiniStoreSalesReturnsService } from './mini-store-sales-returns.service';
import { InvoiceSaleReturnDto } from './dto/invoice-sale-return.dto';
import { CfdiClass, Concepto, Impuesto } from '@signati/sdk-node';
import { InvoiceCompanyService } from '../../invoice/invoice-company/invoice-company.service';
import { divNumber, ivaAndFinalAmount, MultNumber } from '../../common/numbers';
import { add, div, mul, round, sub } from 'exact-math';

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
              public serviceInvoiceCompany: InvoiceCompanyService) {
  }

  get base(): CrudController<SalesReturns> {
    return this;
  }

  @Post('/facturar')
  async verifyregistration(@Body() dataToInvoice: InvoiceSaleReturnDto): Promise<any> {
    const saleReturn = await this.service.getReturnDetails(dataToInvoice.idSale);
    // TODO hacer esto dinamico
    const company = await this.serviceInvoiceCompany.findCompany(3);
    // this.desglose.iva = ivaAndFinalAmount(+saleReturn.amount).iva
    const cfdi = new CfdiClass({
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
    });

    cfdi.emisor({
      Rfc: company.rfc,
      Nombre: company.businessName,
      RegimenFiscal: company.fiscalRegime,
    });
    cfdi.receptor({
      Rfc: dataToInvoice.receptorRfc,
      Nombre: dataToInvoice.receptor,
      UsoCFDI: dataToInvoice.usoCfdi,
    });

    for (const product of saleReturn.details) {
      const concept = new Concepto({
        ClaveProdServ: product.saleDetail.miniStoreProduct.storeInvoiceKey.key,
        NoIdentificacion: 'AULOG001',
        Cantidad: MultNumber(product.quantity, 1),
        ClaveUnidad: 'H87',
        Unidad: 'Pieza',
        Descripcion: product.saleDetail.miniStoreProduct.name,
        ValorUnitario: divNumber(product.amount, product.quantity),
        Importe: MultNumber(divNumber(product.amount, product.quantity), product.quantity),
        Descuento: '0.00',
      });
      concept.traslado({
        Base: concept.getImpuestoBase(),
        Impuesto: '002',
        TipoFactor: 'Tasa',
        TasaOCuota: '0.160000',
        Importe: concept.getImpuestoImporte('0.160000'),
      });
      cfdi.concepto(concept);
    }
    const impuesto = new Impuesto({ totalImpuestosTrasladados: ivaAndFinalAmount(+saleReturn.amount).iva });
    impuesto.traslados([{
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: ivaAndFinalAmount(+saleReturn.amount).iva,
    }]);
    cfdi.impuesto(impuesto);
    console.log(cfdi.validateAll());

    return cfdi.getCfdi();
  }
}
