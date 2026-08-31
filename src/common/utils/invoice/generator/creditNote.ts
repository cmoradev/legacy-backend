import { InvoiceSat } from '../../../../credit-note-academy/credit-note-academy.service';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import {
  Environment,
  InvoiceModules,
  RelateParams,
} from '../../../../common/point-of-sale/types.pos';
import * as moment from 'moment-timezone';
import {
  Comprobante,
  ExportacionEnum,
  initializeCfdi,
  ComprobanteEmisor,
  ComprobanteReceptor,
  RegimenFiscalEnum,
  ComprobanteConcepto,
  ComprobanteConceptoImpuestos,
  ComprobanteConceptoImpuestosTraslado,
  TipoFactorEnum,
  ImpuestoEnum,
  ObjetoImpEnum,
  ComprobanteImpuestos,
  ComprobanteImpuestosTraslado,
  ComprobanteCfdiRelacionados,
  ComprobanteCfdiRelacionadosCfdiRelacionado,
  TipoRelacionEnum,
  FormaPagoEnum,
  MonedaEnum,
  TipoComprobanteEnum,
  MetodoPagoEnum,
} from '@munyaal/cfdi';
import {
  FullGenerateXml,
  FullGenerateResult,
  getFolderComprobantes,
} from './generateInvoice';
import { Concept, Decimal } from '@munyaal/calculations';
import { getMoreDatails } from '../../../../common/point-of-sale/utils';
import { sanitizeStringToXml } from '../../sanitizeStringToXml';
import { S3Service } from 'src/common/storage/s3.service';

interface CreditNoteTelweb {
  env: Environment;
  settingsBranchOffice: BranchOfficeSetting;
  invoice: InvoiceSat;
  receiver: any;
  relations: RelateParams[];
  type: InvoiceModules;
  calculations: any;
  concepts: any[];
  s3Service: S3Service;
}

export async function CreditNote(
  payload: CreditNoteTelweb,
): Promise<FullGenerateResult> {
  const {
    env,
    settingsBranchOffice,
    invoice,
    receiver,
    relations = [],
    concepts,
    type,
    calculations,
    s3Service,
  } = payload;
  const { instancePath } = env;

  const isGlobal =
    receiver.rfc == 'XEXX010101000' || receiver.rfc == 'XAXX010101000';
¿¿

  const CFDIService = initializeCfdi({
    certificate: {
      cerPath: `${instancePath}CSD/${settingsBranchOffice.cerCSD}`,
      keyPath: `${instancePath}CSD/${settingsBranchOffice.keyCSD}`,
      password: settingsBranchOffice.password,
    },
  });

  let folder = getFolderComprobantes(undefined, true);

  const comprobante = new Comprobante({
    Version: '4.0',
    Serie: invoice.Serie,
    Folio: invoice.Folio,
    Fecha: moment.tz('America/Mexico_City').format('YYYY-MM-DDTHH:mm:ss'),
    FormaPago: invoice.FormaPago as FormaPagoEnum,
    Moneda: invoice.Moneda as MonedaEnum,
    SubTotal: new Decimal(invoice.SubTotal).toFixed(2),
    Descuento: invoice.Descuento
      ? new Decimal(invoice.Descuento).toFixed(2)
      : '0',
    Total: new Decimal(invoice.Total).toFixed(2),
    TipoDeComprobante: invoice.TipoDeComprobante as TipoComprobanteEnum,
    Exportacion: ExportacionEnum.E01,
    MetodoPago: invoice.MetodoPago as MetodoPagoEnum,
    LugarExpedicion: invoice.LugarExpedicion,
  });

  if (invoice.condicionesDePago && invoice.condicionesDePago != '')
    comprobante.CondicionesDePago = invoice.condicionesDePago;

  comprobante.Emisor = new ComprobanteEmisor({
    Rfc: settingsBranchOffice.rfc,
    Nombre: settingsBranchOffice.businessName,
    RegimenFiscal: (settingsBranchOffice.regime as unknown) as RegimenFiscalEnum,
  });
  comprobante.Receptor = new ComprobanteReceptor({
    Nombre: receiver.Nombre,
    Rfc: receiver.Rfc,
    UsoCFDI: receiver.UsoCFDI,
    DomicilioFiscalReceptor: receiver.DomicilioFiscalReceptor,
    RegimenFiscalReceptor: receiver.RegimenFiscalReceptor,
  });
  for (const cts of generateConceptsCreditNote(
    type,
    calculations,
    concepts,
    isGlobal,
  )) {
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
      Cantidad: Cantidad,
      ClaveUnidad,
      Descripcion,
      ValorUnitario: ValorUnitario,
      Descuento: Descuento,
      Importe: Importe,
      ObjetoImp,
    });
    if (type !== InvoiceModules.SCHOOL && ObjetoImp === ObjetoImpEnum.OI02) {
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
    }
    comprobante.Conceptos.push(concepto);
  }

  if (type !== InvoiceModules.SCHOOL) {
    const impuestos = new ComprobanteImpuestos({
      TotalImpuestosTrasladados: new Decimal(
        calculations.data.detailsWithPaymentApplied.tax,
      ).toFixed(2),
    });

    const traslado = new ComprobanteImpuestosTraslado({
      Base: new Decimal(
        calculations.data.detailsWithPaymentApplied.baseTax,
      ).toFixed(2),
      Impuesto: ImpuestoEnum.I002,
      TasaOCuota: '0.160000',
      Importe: new Decimal(
        calculations.data.detailsWithPaymentApplied.tax,
      ).toFixed(2),
      TipoFactor: TipoFactorEnum.Tasa,
    });

    impuestos.Traslados.push(traslado);
    comprobante.Impuestos = impuestos;
  }

  if (relations?.length) {
    relations.forEach((value) => {
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

  return FullGenerateXml(comprobante, CFDIService, folder, s3Service);
}

const generateConceptsCreditNote = (
  type: InvoiceModules,
  calculations: any,
  concepts: any[],
  isGlobal: boolean,
) => {
  let cptArray: any[] = [];
  let cpt = {} as any;

  calculations.data.detailsWithoutPaymentApplied.concepts.forEach(
    (concept: Concept) => {
      const conceptDetails = concepts.find((d) => d.id === concept.id);
      const moreDetails = getMoreDatails({ detail: conceptDetails, type });
      cpt = {
        concept: {
          ClaveProdServ: moreDetails.claveProd,
          Cantidad: concept.quantity,
          ClaveUnidad: moreDetails?.ClaveUnidad || 'E48',
          Descripcion: sanitizeStringToXml(moreDetails.descrption),
          ValorUnitario: concept.fiscalPrices.unitPrice,
          Importe: concept.fiscalPrices.amount,
          Descuento: concept.fiscalPrices.discount,
          ObjetoImp:
            type !== InvoiceModules.SCHOOL
              ? ObjetoImpEnum.OI02
              : ObjetoImpEnum.OI01,
        },
        base: '',
        import: '',
      };
      if (cpt.concept.ObjetoImp === ObjetoImpEnum.OI02) {
        cpt.base = new Decimal(concept.fiscalPrices.baseTax).toFixed(6);
        cpt.import = new Decimal(concept.fiscalPrices.tax).toFixed(6);
      }
      cptArray.push(cpt);
    },
  );

  return cptArray;
};
