import { CFDI, Comprobante, Concepts, Emisor, FormaPago, FormaPagoType, Iedu, Impuestos, Receptor, XmlIeduAttribute } from '@signati/core';
import { ObjetoImpEnum, XmlConceptoAttributes } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import { ExportacionEnum } from '@signati/core/lib/signati/types/Catalogs/FormaPago'
import { mulQuantity, subQuantity, sumQuantity } from '../../../../common/point-of-sale/point-of-sale';
import { CFDIWebtel, FacturaDetalles } from '../../../../common/point-of-sale/miniStore-point-of-sale';
import * as moment from 'moment-timezone';
import { XmlReceptorAttribute } from '@signati/core/lib/signati/types/Tags/receptor.inteface';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { add } from 'exact-math';
import { sanitizeStringToXml } from '../../../../common/utils/sanitizeStringToXml';

export async function GenerateInvoice(payload: CFDIWebtel): Promise<string> {
  const {
    folio,
    serie,
    subtotal,
    total,
    discount,
    informacionGlobal,
    emisor,
    receptor,
    codigoFormaPago,
    detalles = [],
    env,
    importeImpuesto = .16,
  } = payload;
  const { instancePath, xslt } = env
  const key = instancePath + 'CSD/' + emisor.keyCSD;
  const cer = instancePath + 'CSD/' + emisor.cerCSD;
  const genericRFC = ['XEXX010101000', 'XAXX010101000'];
  const fecha = moment.tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss');
  const comprobante: Comprobante = {
    Serie: serie,
    Folio: folio,
    Fecha: fecha,
    Sello: '',
    FormaPago: codigoFormaPago,
    NoCertificado: '',
    Certificado: '',
    // condicionesDePago: 'Contado',
    SubTotal: parseFloat(`${subtotal}`).toFixed(2),
    Descuento: parseFloat(`${discount}`).toFixed(2),
    Total: parseFloat(`${total}`).toFixed(2),
    Moneda: 'MXN',
    TipoDeComprobante: 'I',
    MetodoPago: 'PUE',
    LugarExpedicion: emisor.zip,
    Exportacion: ExportacionEnum.NoAplica
  };
  const cfd = new CFDI(comprobante, {
    debug: true,
    xslt,
  });

  const isGeneric = genericRFC.includes(receptor.Rfc.replace(/\s/g, ''))

  if (isGeneric) {
    cfd.informacionGlobal(informacionGlobal)
  }

  const emi = new Emisor({
    Rfc: sanitizeStringToXml(emisor.rfc.trim().toUpperCase()),
    Nombre: sanitizeStringToXml(emisor.businessName.trim().toUpperCase()),
    RegimenFiscal: emisor.fiscalRegime.trim().toUpperCase(),
  });
  await cfd.emisor(emi);

  //delete receptor.RegimenFiscalReceptor
  const recep = new Receptor({
    ...receptor,
    Rfc: sanitizeStringToXml(receptor.Rfc),
    Nombre: sanitizeStringToXml(receptor.Nombre),
    DomicilioFiscalReceptor: isGeneric ? emisor.zip : receptor.ResidenciaFiscal
  });

  await cfd.receptor(recep);
  let totalTranslado = '0.00';
  for (const detalle of detalles) {
    const concepto = new Concepts({
      ClaveProdServ: detalle.claveProd,
      NoIdentificacion: detalle.NoIdentificacion,
      Cantidad: detalle.quantity,
      ClaveUnidad: 'E48',
      Unidad: 'Pieza',
      Descripcion: sanitizeStringToXml(detalle.descrption),
      ValorUnitario: parseFloat(`${detalle.unitPrice}`).toFixed(2),
      Importe: parseFloat(`${detalle.importe}`).toFixed(2),
      Descuento: parseFloat(
        `${add(detalle.discountTotal, detalle?.scholarships || 0)}`,
      ).toFixed(2),
      ObjetoImp: ObjetoImpEnum.SíObjetoDeImpuesto
    } as XmlConceptoAttributes);
    if (importeImpuesto !== 0) {
      concepto.traslado({
        Base: subQuantity(detalle.importe, detalle.discountTotal, -2).toString(),
        Impuesto: '002',
        TipoFactor: 'Tasa',
        TasaOCuota: '0.160000',
        Importe: mulQuantity(subQuantity(detalle.importe, detalle.discountTotal, -2), importeImpuesto, -2).toString(),
      });
      totalTranslado = sumQuantity(mulQuantity(subQuantity(detalle.importe, detalle.discountTotal, -2), importeImpuesto, -2), totalTranslado).toString();
    }
    await cfd.concepto(concepto);
  }
  const impuesto: Impuestos = new Impuestos({
    TotalImpuestosTrasladados: totalTranslado,
  });

  if (importeImpuesto !== 0) {
    impuesto.traslados({
      Base: parseFloat(`${subtotal}`).toFixed(2),
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: totalTranslado,
    });
    await cfd.impuesto(impuesto);
  }
  await cfd.certificar(cer);
  await cfd.sellar(key, emisor.password);
  const xml = await cfd.getXmlCdfi();
  return xml;
}

export async function GenerateInvoiceIedu(payload: CFDIWebtel & { student: XmlIeduAttribute }): Promise<string> {

  const {
    folio,
    serie,
    subtotal,
    total,
    discount,
    informacionGlobal,
    emisor,
    receptor,
    codigoFormaPago,
    detalles = [],
    env,
    student,
    importeImpuesto = .16,
  } = payload;
  const { instancePath, xslt } = env
  const key = instancePath + 'CSD/' + emisor.keyCSD;
  const cer = instancePath + 'CSD/' + emisor.cerCSD;
  const fecha = moment.tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss');
  const comprobante: Comprobante = {
    Serie: serie,
    Folio: folio,
    Fecha: fecha,
    Sello: '',
    FormaPago: codigoFormaPago,
    NoCertificado: '',
    Certificado: '',
    // condicionesDePago: 'Contado',
    SubTotal: parseFloat(`${subtotal}`).toFixed(2),
    Descuento: parseFloat(`${discount}`).toFixed(2),
    Total: parseFloat(`${total}`).toFixed(2),
    Moneda: 'MXN',
    TipoDeComprobante: 'I',
    MetodoPago: 'PUE',
    LugarExpedicion: emisor.zip, // ,
    Exportacion: ExportacionEnum.NoAplica
  };
  const cfd = new CFDI(comprobante, { debug: true, xslt });
  const emi = new Emisor({
    Rfc: emisor.rfc.trim().toUpperCase(),
    Nombre: emisor.businessName.trim().toUpperCase(),
    RegimenFiscal: emisor.fiscalRegime.trim().toUpperCase(),
  });
  await cfd.emisor(emi);
  const recep = new Receptor(receptor);
  await cfd.receptor(recep);
  let totalTranslado = '0.00';
  for (const detalle of detalles) {
    const concepto = new Concepts({
      ClaveProdServ: detalle.claveProd,
      NoIdentificacion: detalle.NoIdentificacion,
      Cantidad: detalle.quantity,
      ClaveUnidad: detalle.unidad,
      Unidad: 'Pieza',
      Descripcion: detalle.descrption,
      ValorUnitario: parseFloat(`${detalle.unitPrice}`).toFixed(2),
      Importe: parseFloat(`${detalle.importe}`).toFixed(2),
      Descuento: parseFloat(
        `${add(detalle.discountTotal, detalle.scholarships)}`,
      ).toFixed(2),
      ObjetoImp: ObjetoImpEnum.NoobjetoDeimpuesto
    });
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
