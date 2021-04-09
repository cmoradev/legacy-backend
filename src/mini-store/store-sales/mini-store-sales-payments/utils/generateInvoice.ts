import { CFDI, Comprobante, Concepts, Emisor, FormaPago, FormaPagoType, Iedu, Impuestos, Receptor, XmlIeduAttribute } from '@signati/core';
import { XmlConceptoAttributes } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import { mulQuantity, subQuantity, sumQuantity } from '../../../../common/point-of-sale/point-of-sale';
import { FacturaDetalles } from '../../../../common/point-of-sale/miniStore-point-of-sale';
import * as moment from 'moment-timezone';
import { XmlReceptorAttribute } from '@signati/core/lib/signati/types/Tags/receptor.inteface';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';

export async function GenerateInvoice(data: { serie: string; folio: string, },
                                      codigoFormaPago: FormaPago | FormaPagoType,
                                      emisor: BranchOfficeSetting,
                                      receptor: XmlReceptorAttribute, factura: FacturaDetalles,
                                      instancePath: string, importeImpuesto = .16,
) {
  const key = instancePath + 'CSD/' + emisor.keyCSD;
  const cer = instancePath + 'CSD/' + emisor.cerCSD;
  const fecha = moment.tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss');
  const comprobante: Comprobante = {
    Serie: data.serie,
    Folio: data.folio,
    Fecha: fecha,
    Sello: '',
    FormaPago: codigoFormaPago,
    NoCertificado: '',
    Certificado: '',
    // condicionesDePago: 'Contado',
    SubTotal: factura.subtotal.toString(),
    Descuento: factura.discount.toString(),
    Moneda: 'MXN',
    Total: factura.total.toString(),
    TipoDeComprobante: 'I',
    MetodoPago: 'PUE',
    LugarExpedicion: emisor.zip, // ,
  };

  const cfd = new CFDI(comprobante);
  const emi = new Emisor({
    Rfc: emisor.rfc,
    Nombre: emisor.businessName,
    RegimenFiscal: emisor.fiscalRegime,
  });
  await cfd.emisor(emi);
  const total: number = 0;
  const recep = new Receptor(receptor);
  await cfd.receptor(recep);
  let totalTranslado = '0.00';
  for (const detalle of factura.detalles) {
    const concepto = new Concepts({
      ClaveProdServ: detalle.claveProd,
      NoIdentificacion: detalle.NoIdentificacion,
      Cantidad: detalle.quantity,
      ClaveUnidad: 'E48',
      Unidad: 'Pieza',
      Descripcion: detalle.descrption,
      ValorUnitario: detalle.unitPrice,
      Importe: detalle.importe,
      Descuento: detalle.discountTotal,
    } as XmlConceptoAttributes);
    if (importeImpuesto !== 0) {
      concepto.traslado({
        Base: subQuantity(detalle.importe, detalle.discountTotal, -5).toString(),
        Impuesto: '002',
        TipoFactor: 'Tasa',
        TasaOCuota: '0.160000',
        Importe: mulQuantity(subQuantity(detalle.importe, detalle.discountTotal, -5), importeImpuesto, -5).toString(),
      });
      totalTranslado = sumQuantity(mulQuantity(subQuantity(detalle.importe, detalle.discountTotal), importeImpuesto), totalTranslado).toString();
    }
    await cfd.concepto(concepto);
  }
  const impuesto: Impuestos = new Impuestos({
    TotalImpuestosTrasladados: totalTranslado,
  });

  if (importeImpuesto !== 0) {
    impuesto.traslados({
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: totalTranslado,
    });
    await cfd.impuesto(impuesto);
  } /*else {
    impuesto.traslados({
      Impuesto: '002',
      TipoFactor: 'Exento',
      TasaOCuota: '0.000000',
      Importe: totalTranslado,
    });
  }*/
  await cfd.certificar(cer);
  await cfd.sellar(key, emisor.password);
  const xml = await cfd.getXmlCdfi();
  return xml;
}

export async function GenerateInvoiceIedu(data: { serie: string; folio: string, },
                                          codigoFormaPago: FormaPago | FormaPagoType,
                                          emisor: BranchOfficeSetting,
                                          receptor: XmlReceptorAttribute,
                                          student: XmlIeduAttribute,
                                          factura: FacturaDetalles,
                                          instancePath: string) {
  const key = instancePath + 'CSD/' + emisor.keyCSD;
  const cer = instancePath + 'CSD/' + emisor.cerCSD;
  const fecha = moment.tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss');
  const comprobante: Comprobante = {
    Serie: data.serie,
    Folio: data.folio,
    Fecha: fecha,
    Sello: '',
    FormaPago: codigoFormaPago,
    NoCertificado: '',
    Certificado: '',
    // condicionesDePago: 'Contado',
    SubTotal: factura.subtotal.toString(),
    Descuento: factura.discount.toString(),
    Moneda: 'MXN',
    Total: factura.total.toString(),
    TipoDeComprobante: 'I',
    MetodoPago: 'PUE',
    LugarExpedicion: emisor.zip, // ,
  };
  const cfd = new CFDI(comprobante);
  const emi = new Emisor({
    Rfc: emisor.rfc,
    Nombre: emisor.businessName,
    RegimenFiscal: emisor.fiscalRegime,
  });
  await cfd.emisor(emi);
  const total: number = 0;
  const recep = new Receptor(receptor);
  await cfd.receptor(recep);
  let totalTranslado = '0.00';
  let totalRetenido = '0.00';
  for (const detalle of factura.detalles) {
    const concepto = new Concepts({
      ClaveProdServ: detalle.claveProd,
      NoIdentificacion: detalle.NoIdentificacion,
      Cantidad: detalle.quantity,
      ClaveUnidad: detalle.unidad,
      Unidad: 'Pieza',
      Descripcion: detalle.descrption,
      ValorUnitario: detalle.unitPrice,
      Importe: detalle.importe,
      Descuento: detalle.discountTotal,
    } as XmlConceptoAttributes);
    totalTranslado = sumQuantity(mulQuantity(subQuantity(detalle.importe, detalle.discountTotal), 0), totalTranslado).toString();
    const ieduObject: XmlIeduAttribute = student;
    const iedu = new Iedu(ieduObject);
    await concepto.complemento(iedu);
    await cfd.concepto(concepto);
  }
  await cfd.certificar(cer);
  await cfd.sellar(key, emisor.password);
  const xml = await cfd.getXmlCdfi();
  return xml;
}
