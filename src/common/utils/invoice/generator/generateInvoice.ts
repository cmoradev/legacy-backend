import { ConceptoComplementoIeduElement } from '@munyaal/cfdi';
import { sumQuantity } from '../../../point-of-sale/point-of-sale';
import * as moment from 'moment-timezone';
import { sanitizeStringToXml } from '../../sanitizeStringToXml';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { MonthEnum, PeriodicityEnum } from '../../../dto/not-invoiced.dto';
import { ivaFromFinalAmount } from '../../../numbers';
import {
  CFDIWebtel,
  Environment,
  InvoiceDetails,
  InvoiceModules,
} from '../../../point-of-sale/types.pos';
import {
  initializeCfdi,
  Comprobante as ComprobanteCfdi,
  MonedaEnum,
  TipoComprobanteEnum,
  ExportacionEnum as ExportacionEnumMunyaal,
  MetodoPagoEnum,
  ComprobanteEmisor,
  RegimenFiscalEnum,
  UsoCfdiEnum,
  ComprobanteReceptor,
  ComprobanteImpuestos,
  ComprobanteImpuestosTraslado,
  ImpuestoEnum,
  TipoFactorEnum,
  ComprobanteConcepto,
  ComprobanteConceptoImpuestos,
  ComprobanteConceptoImpuestosTraslado,
  ObjetoImpEnum as ObjetoImpEnumMunyaal,
  Iedu as IeduMunyaal,
  ComprobanteConceptoComplementoConcepto,
  ComprobanteInformacionGlobal,
  MesesEnum,
  PeriodicidadEnum,
  FormaPagoEnum,
  ComprobanteCfdiRelacionados,
  TipoRelacionEnum,
  ComprobanteCfdiRelacionadosCfdiRelacionado,
} from '@munyaal/cfdi';
import { FactSw, StampV4, TDF } from '../../../../webService/FactSw';
import { CfdiPdf } from '@munyaal/cfdi-pdf';
import { S3Service } from 'src/common/storage/s3.service';
import { cfdiErrorToHttpException, normalizeCfdiError } from '../cfdi-errors';

export type GlobalInvoiceParams = {
  branchOfficeConfig: BranchOfficeSetting;
  env: Environment;
  folio: string;
  wayPayment: FormaPagoEnum;
  details: InvoiceDetails;
  infoGlobal: {
    periodicity: PeriodicityEnum;
    month: MonthEnum;
    year: string;
  };
  percentageTax: string;
};

export interface InvoiceModule extends CFDIWebtel {
  type: InvoiceModules;
  Moneda: MonedaEnum;
  TipoDeComprobante: TipoComprobanteEnum;
  Exportacion: ExportacionEnumMunyaal;
  MetodoPago: MetodoPagoEnum;
  student?: ConceptoComplementoIeduElement;
  s3Service: S3Service;
}

export const GenerateInvoiceMunyaal = async (
  params: InvoiceModule,
): Promise<FullGenerateResult> => {
  const {
    Moneda,
    MetodoPago,
    TipoDeComprobante,
    Exportacion,
    folio,
    serie,
    emisor,
    taxes,
    totals,
    concepts,
    receptor,
    codigoFormaPago,
    env,
    type,
    student,
    related,
    s3Service,
  } = params;
  const CFDIService = initializeCfdi({
    certificate: {
      cerPath: env.instancePath + 'CSD/' + emisor.cerCSD,
      keyPath: env.instancePath + 'CSD/' + emisor.keyCSD,
      password: emisor.password,
    },
  });

  let folder = getFolderComprobantes(type);

  const comprobante = new ComprobanteCfdi({
    Version: '4.0',
    Serie: serie,
    Folio: folio,
    Fecha: moment.tz('America/Mexico_City').format('YYYY-MM-DDTHH:mm:ss'),
    FormaPago: codigoFormaPago as FormaPagoEnum,
    Moneda,
    SubTotal: totals.fiscal.SubTotal,
    Descuento: totals.fiscal.Descuento,
    Total: totals.fiscal.Total,
    TipoDeComprobante,
    Exportacion,
    MetodoPago,
    LugarExpedicion: emisor.zip,
  });

  comprobante.Emisor = new ComprobanteEmisor({
    Rfc: emisor.rfc.trim().toUpperCase(),
    Nombre: emisor.businessName.trim().toUpperCase(),
    RegimenFiscal: emisor.fiscalRegime as RegimenFiscalEnum,
  });

  comprobante.Receptor = new ComprobanteReceptor({
    Rfc: receptor.Rfc,
    Nombre: receptor.Nombre,
    UsoCFDI: receptor.UsoCFDI as UsoCfdiEnum,
    RegimenFiscalReceptor: receptor.RegimenFiscalReceptor as RegimenFiscalEnum,
    DomicilioFiscalReceptor: receptor.DomicilioFiscalReceptor,
  });

  if (related?.length) {
    related.forEach((value) => {
      const cfdiRelacionados = new ComprobanteCfdiRelacionados({
        TipoRelacion: value.type as TipoRelacionEnum,
      });

      value.documents.forEach((document) => {
        const cfdiRelacionado = new ComprobanteCfdiRelacionadosCfdiRelacionado({
          UUID: document,
        });

        cfdiRelacionados.CfdiRelacionado.push(cfdiRelacionado);
      });

      comprobante.CfdiRelacionados.push(cfdiRelacionados);
    });
  }

  for (const cts of concepts.conceptsInvoice) {
    const {
      ClaveProdServ,
      Cantidad,
      ClaveUnidad,
      Descripcion,
      ValorUnitario,
      Descuento,
      Importe,
      ObjetoImp,
      NoIdentificacion,
    } = cts.concept;
    const concepto = new ComprobanteConcepto({
      NoIdentificacion,
      ClaveProdServ,
      Cantidad: Cantidad.toString(),
      ClaveUnidad,
      Descripcion,
      ValorUnitario: ValorUnitario.toString(),
      Descuento: Descuento.toString(),
      Importe: Importe.toString(),
      ObjetoImp: ObjetoImp as ObjetoImpEnumMunyaal,
    });
    if (
      type !== InvoiceModules.SCHOOL &&
      cts.concept.ObjetoImp === ObjetoImpEnumMunyaal.OI02
    ) {
      const impuestos = new ComprobanteConceptoImpuestos();

      const traslados = new ComprobanteConceptoImpuestosTraslado({
        Base: cts.base,
        Importe: cts.import,
        Impuesto: ImpuestoEnum.I002,
        TasaOCuota: '0.160000',
        TipoFactor: TipoFactorEnum.Tasa,
      });

      impuestos.Traslados.push(traslados);

      concepto.Impuestos = impuestos;
    } else {
      concepto.ComplementoConcepto = new ComprobanteConceptoComplementoConcepto();
      concepto.ComplementoConcepto.iedu = new IeduMunyaal(student);
    }
    comprobante.Conceptos.push(concepto);
  }

  if (type !== InvoiceModules.SCHOOL) {
    const impuestos = new ComprobanteImpuestos({
      TotalImpuestosTrasladados: taxes.amount,
    });

    const traslado = new ComprobanteImpuestosTraslado({
      Base: taxes.base,
      Impuesto: ImpuestoEnum.I002,
      TasaOCuota: '0.160000',
      Importe: taxes.amount,
      TipoFactor: TipoFactorEnum.Tasa,
    });

    impuestos.Traslados.push(traslado);

    comprobante.Impuestos = impuestos;
  }

  return FullGenerateXml(comprobante, CFDIService, folder, s3Service);
};

export const GenerateGlobalInvoiceMunyaal = async (
  params: GlobalInvoiceParams & {
    type: InvoiceModules;
    Moneda: MonedaEnum;
    TipoDeComprobante: TipoComprobanteEnum;
    Exportacion: ExportacionEnumMunyaal;
    MetodoPago: MetodoPagoEnum;
    s3Service: S3Service;
  },
): Promise<FullGenerateResult> => {
  const {
    details,
    branchOfficeConfig,
    env,
    folio,
    wayPayment,
    infoGlobal,
    percentageTax,
    type,
    Moneda,
    TipoDeComprobante,
    Exportacion,
    MetodoPago,
    s3Service,
  } = params;

  const { keyCSD, cerCSD, serieFacturacion, password } = branchOfficeConfig;

  const { instancePath } = env;

  const { discount, taxes, total, subtotal, details: concepts } = details;

  const { periodicity, month, year } = infoGlobal;

  const CFDIService = initializeCfdi({
    certificate: {
      cerPath: `${instancePath}CSD/${cerCSD}`,
      keyPath: `${instancePath}CSD/${keyCSD}`,
      password: password,
    },
  });

  let folder = getFolderComprobantes(type);

  const comprobante = new ComprobanteCfdi({
    Version: '4.0',
    Serie: serieFacturacion,
    Folio: folio,
    Fecha: moment.tz('America/Mexico_City').format('YYYY-MM-DDTHH:mm:ss'),
    FormaPago: wayPayment as FormaPagoEnum,
    Moneda,
    SubTotal: parseFloat(`${subtotal}`).toFixed(2),
    Descuento: parseFloat(`${discount}`).toFixed(2),
    Total: parseFloat(`${total}`).toFixed(2),
    TipoDeComprobante,
    Exportacion,
    MetodoPago,
    LugarExpedicion: branchOfficeConfig.zip.trim().toUpperCase(),
  });

  comprobante.Emisor = new ComprobanteEmisor({
    Rfc: sanitizeStringToXml(branchOfficeConfig.rfc.trim().toUpperCase()),
    Nombre: sanitizeStringToXml(
      branchOfficeConfig.businessName.trim().toUpperCase(),
    ),
    RegimenFiscal: branchOfficeConfig.fiscalRegime
      .trim()
      .toUpperCase() as RegimenFiscalEnum,
  });

  comprobante.Receptor = new ComprobanteReceptor({
    Rfc: 'XAXX010101000',
    Nombre: 'PUBLICO EN GENERAL',
    DomicilioFiscalReceptor: branchOfficeConfig.zip.trim().toUpperCase(),
    RegimenFiscalReceptor: RegimenFiscalEnum.RF616,
    UsoCFDI: UsoCfdiEnum.S01,
  });

  comprobante.InformacionGlobal = new ComprobanteInformacionGlobal({
    Meses: (month as unknown) as MesesEnum,
    Periodicidad: (periodicity as unknown) as PeriodicidadEnum,
    Anio: year,
  });

  for (const payload of concepts) {
    const { iva, amountWithOutIva } = ivaFromFinalAmount(
      payload.amount,
      -2,
      sumQuantity(percentageTax, 1),
    );

    const amount = parseFloat(`${amountWithOutIva}`).toFixed(2);
    const tax = parseFloat(`${iva}`).toFixed(2);

    const concept = new ComprobanteConcepto({
      ClaveProdServ: payload.keyProdServ,
      Cantidad: payload.quantity.toString(),
      ClaveUnidad: payload.keyUnit,
      Descripcion: payload.description,
      ValorUnitario: amount.toString(),
      Importe: amount.toString(),
      Descuento: payload.discount.toString(),
      ObjetoImp: payload.objectImp as ObjetoImpEnumMunyaal,
      NoIdentificacion: payload.noIdentity,
    });

    if (
      percentageTax !== '0' &&
      payload.objectImp === ObjetoImpEnumMunyaal.OI02
    ) {
      const impuestos = new ComprobanteConceptoImpuestos();

      const traslados = new ComprobanteConceptoImpuestosTraslado({
        Base: amount,
        Importe: tax,
        Impuesto: ImpuestoEnum.I002,
        TasaOCuota: '0.160000',
        TipoFactor: TipoFactorEnum.Tasa,
      });

      impuestos.Traslados.push(traslados);

      concept.Impuestos = impuestos;
    }

    comprobante.Conceptos.push(concept);
  }
  if (type !== InvoiceModules.SCHOOL) {
    const impuestos = new ComprobanteImpuestos({
      TotalImpuestosTrasladados: taxes.toFixed(2),
    });

    const traslado = new ComprobanteImpuestosTraslado({
      Base: subtotal.toFixed(2),
      Impuesto: ImpuestoEnum.I002,
      TasaOCuota: '0.160000',
      Importe: taxes.toFixed(2),
      TipoFactor: TipoFactorEnum.Tasa,
    });

    impuestos.Traslados.push(traslado);

    comprobante.Impuestos = impuestos;
  }

  return FullGenerateXml(comprobante, CFDIService, folder, s3Service);
};

export const getFolderComprobantes = (
  type?: InvoiceModules,
  isCredit?: boolean,
) => {
  const folder = 'comprobantes';
  if (isCredit) {
    return `${folder}/notas-credito`;
  } else {
    switch (type) {
      case InvoiceModules.ACADEMY:
        return `${folder}/academias`;
      case InvoiceModules.SCHOOL:
        return `${folder}/colegio`;
      case InvoiceModules.STORE:
        return `${folder}/tienda`;
      default:
        return folder;
    }
  }
};

export interface InvoiceStepError {
  step: string;
  message: string;
  stack?: string;
}

export interface FullGenerateResult {
  stamped: boolean;
  s3Uploaded: boolean;
  uuid?: string;
  timbrado?: StampV4;
  total?: string;
  warnings: InvoiceStepError[];
}

export const FullGenerateXml = async (
  comprobante: ComprobanteCfdi,
  CFDIService: any,
  folder: string,
  s3Service: S3Service,
): Promise<FullGenerateResult> => {
  const result: FullGenerateResult = {
    stamped: false,
    s3Uploaded: false,
    warnings: [],
  };

  // ── STEP 1: Sign + Stamp (CRITICAL) ──
  let xml: string;
  try {
    xml = await CFDIService.getXMLSellado(comprobante);
  } catch (err) {
    console.log(
      'ESTE ES EL ERROR DE FACTURACION: ',
      JSON.stringify(err, null, 3),
    );
    result.warnings.push({
      step: 'stamping',
      message: normalizeCfdiError(err).message,
      stack: err.stack,
    });
    throw cfdiErrorToHttpException(err);
  }
  const sw = new FactSw();
  const timbrado = await sw.facturar(xml);
  result.stamped = true;
  result.uuid = timbrado.data.uuid.toUpperCase();
  result.timbrado = timbrado;
  result.total = comprobante.Total;

  // ── STEP 2: Generate PDF buffer (NON-CRITICAL — if it fails, we still upload XML) ──
  let pdfBuffer: Buffer | null = null;
  try {
    const pdf = new CfdiPdf(
      timbrado.data.cfdi,
      timbrado.data.cadenaOriginalSAT,
    );
    pdfBuffer = await pdf.getBuffer();
  } catch (err) {
    result.warnings.push({
      step: 'pdf',
      message: err.message,
      stack: err.stack,
    });
  }

  // ── STEP 3: Upload all files to S3 (CRITICAL — sole storage) ──

  try {
    await _saveFiles(s3Service, pdfBuffer, timbrado.data, folder);
    result.s3Uploaded = true;
  } catch (err) {
    result.warnings.push({
      step: 's3',
      message: err.message,
      stack: err.stack,
    });
  }

  return result;
};

const _saveFiles = async (
  s3Service: S3Service,
  pdfBuffer: Buffer | null,
  data: TDF,
  folder: string,
) => {
  const { qrCode, cfdi, uuid } = data;
  const keyUuid = uuid.toLowerCase();

  const imgBuffer = Buffer.from(qrCode, 'base64');
  const xmlBuffer = Buffer.from(cfdi, 'utf-8');

  const uploads: Promise<any>[] = [
    s3Service.putObjectCommand({
      type: 'application/xml',
      buffer: xmlBuffer,
      key: `${folder}/${keyUuid}.xml`,
    }),
    s3Service.putObjectCommand({
      type: 'image/jpeg',
      buffer: imgBuffer,
      key: `${folder}/${keyUuid}.jpg`,
    }),
  ];

  if (pdfBuffer) {
    uploads.push(
      s3Service.putObjectCommand({
        type: 'application/pdf',
        buffer: pdfBuffer,
        key: `${folder}/${keyUuid}.pdf`,
      }),
    );
  }

  await Promise.all(uploads);
};
