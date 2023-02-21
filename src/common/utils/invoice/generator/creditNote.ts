import { ConceptWithTaxes, InvoiceSat } from "../../../../credit-note-academy/credit-note-academy.service";
import {
    MiniStoreInvoice
} from "../../../../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity";
import {
    SchoolChargesInvoice
} from "../../../../school-colegio-ingles/charges-school/school-charges-invoice/entities/school-charges-invoice.entity";
import { BranchOfficeSetting } from "../../../../system/branch-office-setting/entities/branch-office-setting.entity";
import {
    AcademyChargeInvoice
} from "../../../../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity";
import { Environment, InvoiceModules } from "../../../../common/point-of-sale/types.pos";
import * as moment from 'moment-timezone';
import {
    Comprobante,
    AttributesComprobanteReceptorElement,
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
    ComprobanteConceptoImpuestosRetencion,
    ObjetoImpEnum,
    ComprobanteImpuestos, ComprobanteImpuestosTraslado,
    ComprobanteCfdiRelacionados, ComprobanteCfdiRelacionadosCfdiRelacionado, TipoRelacionEnum, FormaPagoEnum, MonedaEnum, TipoComprobanteEnum, MetodoPagoEnum
} from "@munyaal/cfdi";
import { FullGenerateXml, getFolderComprobantes } from "./generateInvoice";
import { DataInvoice } from "../../../../common/calculations/TypesCalculation";
import { Concept, Decimal } from "@munyaal/calculations";
import { getMoreDatails } from "../../../../common/point-of-sale/utils";
import { sanitizeStringToXml } from "../../sanitizeStringToXml";

interface CreditNoteTelweb {
    env: Environment;
    settingsBranchOffice: BranchOfficeSetting;
    invoice: InvoiceSat;
    receiver: any;
    relations: MiniStoreInvoice[] | AcademyChargeInvoice[] | SchoolChargesInvoice[];
    type: InvoiceModules;
    calculations: any;
    concepts: any[]
}

export async function CreditNote(payload: CreditNoteTelweb) {
    const { env, settingsBranchOffice, invoice, receiver, relations = [],
        concepts, type, calculations } = payload
    const { instancePath, xslt } = env;

    const isGlobal = receiver.rfc == 'XEXX010101000' || receiver.rfc == 'XAXX010101000';

    const CFDIService = initializeCfdi({
        pathXsltCfdi40: xslt,
        password: settingsBranchOffice.password,
        pathKey: `${instancePath}CSD/${settingsBranchOffice.keyCSD}`,
        pathCertificate: `${instancePath}CSD/${settingsBranchOffice.cerCSD}`,
    })

    let folder = getFolderComprobantes(env.instancePath, undefined, true);
    CFDIService.overridePaths({
        pathXmlFolder: folder
    });

    const comprobante = new Comprobante({
        Version: '4.0',
        Serie: invoice.Serie,
        Folio: invoice.Folio,
        Fecha: moment.tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss'),
        FormaPago: invoice.FormaPago as FormaPagoEnum,
        Moneda: invoice.Moneda as MonedaEnum,
        SubTotal: new Decimal(invoice.SubTotal).toFixed(2),
        Descuento: invoice.Descuento ? new Decimal(invoice.Descuento).toFixed(2) : '0',
        Total: new Decimal(invoice.Total).toFixed(2),
        TipoDeComprobante: invoice.TipoDeComprobante as TipoComprobanteEnum,
        Exportacion: ExportacionEnum.E01,
        MetodoPago: invoice.MetodoPago as MetodoPagoEnum,
        LugarExpedicion: invoice.LugarExpedicion,
    });

    comprobante.Emisor = new ComprobanteEmisor({
        Rfc: settingsBranchOffice.rfc,
        Nombre: settingsBranchOffice.businessName,
        RegimenFiscal: settingsBranchOffice.regime as unknown as RegimenFiscalEnum,
    });
    comprobante.Receptor = new ComprobanteReceptor({
        Nombre: receiver.Nombre,
        Rfc: receiver.Rfc,
        UsoCFDI: receiver.UsoCFDI,
        DomicilioFiscalReceptor: receiver.DomicilioFiscalReceptor,
        RegimenFiscalReceptor: receiver.RegimenFiscalReceptor
    })
    for (const cts of generateConceptsCreditNote(type, calculations, concepts, isGlobal)) {
        const { ClaveProdServ, Cantidad, ClaveUnidad, Descripcion, ValorUnitario, Descuento, Importe, ObjetoImp, NoIdentificacion } = cts.concept
        const concepto = new ComprobanteConcepto({
            NoIdentificacion,
            ClaveProdServ,
            Cantidad: Cantidad,
            ClaveUnidad,
            Descripcion,
            ValorUnitario: ValorUnitario,
            Descuento: Descuento,
            Importe: Importe,
            ObjetoImp
        });
        if (type !== InvoiceModules.SCHOOL && ObjetoImp === ObjetoImpEnum.OI02) {
            const impuestos = new ComprobanteConceptoImpuestos();

            const traslados = new ComprobanteConceptoImpuestosTraslado({
                Base: cts.base,
                Importe: cts.import,
                Impuesto: ImpuestoEnum.I002,
                TasaOCuota: '0.160000',
                TipoFactor: TipoFactorEnum.Tasa
            });

            impuestos.Traslados.push(traslados);

            concepto.Impuestos = impuestos;
        }
        comprobante.Conceptos.push(concepto);
    }


    const impuestos = new ComprobanteImpuestos({
        TotalImpuestosTrasladados: new Decimal(calculations.data.detailsWithPaymentApplied.tax).toFixed(2),
    });

    if (type !== InvoiceModules.SCHOOL) {

        const traslado = new ComprobanteImpuestosTraslado({
            Base: new Decimal(calculations.data.detailsWithPaymentApplied.baseTax).toFixed(2),
            Impuesto: ImpuestoEnum.I002,
            TasaOCuota: '0.160000',
            Importe: new Decimal(calculations.data.detailsWithPaymentApplied.tax).toFixed(2),
            TipoFactor: TipoFactorEnum.Tasa
        });

        impuestos.Traslados.push(traslado);
    }

    comprobante.Impuestos = impuestos;


    const cfdiRelacionados = new ComprobanteCfdiRelacionados({
        TipoRelacion: TipoRelacionEnum.TR01
    });

    for (const document of relations) {
        const cfdiRelacionado = new ComprobanteCfdiRelacionadosCfdiRelacionado({
            UUID: document.uuid
        });
        cfdiRelacionados.CfdiRelacionado.push(cfdiRelacionado);
    }

    comprobante.CfdiRelacionados.push(cfdiRelacionados)

    return FullGenerateXml(comprobante, CFDIService, folder, `${env.instancePath}logos/tienditalogo.png`, settingsBranchOffice.zip.trim().toUpperCase())
}

const generateConceptsCreditNote = (type: InvoiceModules, calculations: any, concepts: any[], isGlobal: boolean) => {
    let cptArray: any[] = []
    let cpt = {} as any;
    if(isGlobal){
        concepts.forEach((conceptDetails: any) => {
            cpt = {
                concept: {
                    ClaveProdServ: conceptDetails.sat_code,
                    Cantidad: conceptDetails.quantity,
                    ClaveUnidad: conceptDetails.unitMeasurement,
                    Descripcion: sanitizeStringToXml(conceptDetails.concept),
                    ValorUnitario:  conceptDetails.ValorUnitario,
                    Importe: conceptDetails.Importe,
                    Descuento: conceptDetails.Descuento,
                    ObjetoImp: type !== InvoiceModules.SCHOOL ? ObjetoImpEnum.OI02 : ObjetoImpEnum.OI01
                },
                base: '',
                import: ''
            };
            if (cpt.concept.ObjetoImp === ObjetoImpEnum.OI02) {
                cpt.base = new Decimal(conceptDetails.baseTax).toFixed(6);
                cpt.import = new Decimal(conceptDetails.tax).toFixed(6);
            }
            cptArray.push(cpt)
        });
    }else{
        calculations.data.detailsWithoutPaymentApplied.concepts.forEach((concept: Concept) => {
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
                    ObjetoImp: type !== InvoiceModules.SCHOOL ? ObjetoImpEnum.OI02 : ObjetoImpEnum.OI01
                },
                base: '',
                import: ''
            };
            if (cpt.concept.ObjetoImp === ObjetoImpEnum.OI02) {
                cpt.base =  new Decimal(concept.fiscalPrices.baseTax).toFixed(6);
                cpt.import =  new Decimal(concept.fiscalPrices.tax).toFixed(6);
            }
            cptArray.push(cpt)
        });
    }
    return cptArray;
}
