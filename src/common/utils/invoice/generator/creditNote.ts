import {ConceptWithTaxes, InvoiceSat} from "../../../../credit-note-academy/credit-note-academy.service";
import {
    MiniStoreInvoice
} from "../../../../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity";
import {
    SchoolChargesInvoice
} from "../../../../school-colegio-ingles/charges-school/school-charges-invoice/entities/school-charges-invoice.entity";
import {BranchOfficeSetting} from "../../../../system/branch-office-setting/entities/branch-office-setting.entity";
import {
    AcademyChargeInvoice
} from "../../../../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity";
import {Environment} from "../../../../common/point-of-sale/types.pos";
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
    ComprobanteImpuestos, ComprobanteImpuestosTraslado,
    ComprobanteCfdiRelacionados, ComprobanteCfdiRelacionadosCfdiRelacionado, TipoRelacionEnum
} from "@munyaal/cfdi";
import { FullGenerateXml, getFolderComprobantes } from "./generateInvoice";

interface CreditNoteTelweb {
    env: Environment;
    impuestos: any;
    settingsBranchOffice: BranchOfficeSetting;
    invoice: InvoiceSat;
    concepts: ConceptWithTaxes[] | any[];
    receiver: Partial<AttributesComprobanteReceptorElement>;
    relations: MiniStoreInvoice[] | AcademyChargeInvoice[] | SchoolChargesInvoice[];
}

export async function CreditNote(payload: CreditNoteTelweb) {
    const {env, settingsBranchOffice, invoice, receiver, relations = [], concepts = [], impuestos = {}} = payload
    const {instancePath, xslt} = env


    const CFDIService = initializeCfdi({
        pathXsltCfdi40: xslt,
        password: settingsBranchOffice.password,
        pathKey: `${instancePath}CSD/${settingsBranchOffice.keyCSD}`,
        pathCertificate: `${instancePath}CSD/${settingsBranchOffice.cerCSD}`,
    })

    let folder = getFolderComprobantes(env.instancePath,undefined, true);
    console.log(folder)
    CFDIService.overridePaths({
        pathXmlFolder: folder
    });

    let totalImpuestosRetenidos = 0;

    const comprobante = new Comprobante({
        Version: '4.0',
        Serie: invoice.Serie,
        Folio: invoice.Folio,
        Fecha: moment.tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss'),
        FormaPago: invoice.FormaPago,
        Moneda: invoice.Moneda,
        SubTotal: invoice.SubTotal,
        Descuento: invoice.Descuento ? invoice.Descuento : '0',
        Total: invoice.Total,
        TipoDeComprobante: invoice.TipoDeComprobante,
        Exportacion: '01',
        MetodoPago: invoice.MetodoPago,
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

    concepts.map(async (payload) => {
        const concept = new ComprobanteConcepto({
            ClaveProdServ: payload.claveProd,
            Descripcion: payload.descrption,
            Descuento: payload.discountTotal,
            Cantidad: payload.quantity,
            Importe: payload.importe,
            ObjetoImp: payload.objectoImp,
            ValorUnitario: payload.unitPrice,
            ClaveUnidad: payload.ClaveUnidad,
        });
        const impuestosCon = new ComprobanteConceptoImpuestos();
        if (payload.impuestos && payload.impuestos.trasladado) {

            const traslados = new ComprobanteConceptoImpuestosTraslado({
                Base: payload.impuestos.trasladado.Base,
                Importe: payload.impuestos.trasladado.Importe,
                Impuesto: ImpuestoEnum.I002,
                TasaOCuota: '0.160000',
                TipoFactor: TipoFactorEnum.Tasa
            });

            impuestosCon.Traslados.push(traslados);

        }
        if (typeof payload.impuestosRetenidos !== 'undefined') {
            totalImpuestosRetenidos += Number(payload.impuestosRetenidos.Importe);
            const retenidos = new ComprobanteConceptoImpuestosRetencion({
                Importe: payload.impuestosRetenidos.Importe,
                Impuesto: payload.impuestosRetenidos.Impuesto,
                TasaOCuota: payload.impuestosRetenidos.TasaOCuota,
                TipoFactor: payload.impuestosRetenidos.TipoFactor,
                Base: payload.impuestosRetenidos.Base,
            })
            impuestosCon.Retenciones.push(retenidos)
        }
        if (impuestosCon.Traslados.length || impuestosCon.Retenciones.length) {
            concept.Impuestos = impuestos;
        }
        comprobante.Conceptos.push(concept);
    });

    if (impuestos.translados.Base > 0) {
        const impuestosCom = new ComprobanteImpuestos({
            TotalImpuestosTrasladados: impuestos.translados.Importe,
    
        });

        const traslado = new ComprobanteImpuestosTraslado({
            Base: impuestos.translados.Base,
            Impuesto: ImpuestoEnum.I002,
            TasaOCuota: '0.160000',
            Importe: impuestos.translados.Importe,
            TipoFactor: TipoFactorEnum.Tasa
        });

        impuestosCom.Traslados.push(traslado);
        comprobante.Impuestos = impuestosCom;
    }
    // if (totalImpuestosRetenidos > 0) {
    //     const impuestosRetenidos = new Impuestos({
    //         TotalImpuestosRetenidos: totalImpuestosRetenidos > 0 ? totalImpuestosRetenidos.toString() : '',
    //     });
    //     await impuestosRetenidos.retenciones({
    //         Impuesto: invoice.Impuesto,
    //         // TasaOCuota: invoice.TasaOCuota,
    //         // TipoFactor: invoice.TipoFactor,
    //         Importe: totalImpuestosRetenidos.toString(),
    //     });
    //     await cfdi.impuesto(impuestosRetenidos);
    // }
    // if (totalImpuestosRetenidos > 0 && totalImpuestosTrasladados > 0) {
    //     const impuestosRetenidosTransladados = new Impuestos({
    //         TotalImpuestosRetenidos: totalImpuestosRetenidos > 0 ? totalImpuestosRetenidos.toString() : '',
    //         TotalImpuestosTrasladados: totalImpuestosTrasladados > 0 ? totalImpuestosTrasladados.toString() : ''
    //     });
    //     impuestosRetenidosTransladados.traslados({
    //         Base: invoice.SubTotal,
    //         Impuesto: invoice.Impuesto,
    //         TasaOCuota: invoice.TasaOCuota,
    //         TipoFactor: invoice.TipoFactor,
    //         Importe: totalImpuestosTrasladados.toString(),
    //     });
    //     impuestosRetenidosTransladados.retenciones({
    //         Impuesto: invoice.Impuesto,
    //         //TasaOCuota: invoice.TasaOCuota,
    //         //TipoFactor: invoice.TipoFactor,
    //         Importe: totalImpuestosRetenidos.toString(),
    //     });
    //     await cfdi.impuesto(impuestosRetenidosTransladados);
    // }
    
    
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

    return FullGenerateXml(comprobante, CFDIService,folder, `${env.instancePath}logos/tienditalogo.png`, settingsBranchOffice.address)
}
