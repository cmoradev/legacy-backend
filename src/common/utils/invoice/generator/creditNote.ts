import { Comprobante, CFDI, Receptor, Emisor, Concepts, Impuestos, Relacionado, XmlReceptorAttribute, ObjetoImpEnum } from "@signati/core";
import { ConceptWithTaxes, InvoiceSat } from "src/credit-note-academy/credit-note-academy.service";
import { MiniStoreInvoice } from "src/mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity";
import { SchoolChargesInvoice } from "src/school-colegio-ingles/charges-school/school-charges-invoice/entities/school-charges-invoice.entity";
import { BranchOfficeSetting } from "src/system/branch-office-setting/entities/branch-office-setting.entity";
import { ExportacionEnum } from '@signati/core/lib/signati/types/Catalogs/FormaPago'
import { AcademyChargeInvoice } from "src/academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity";
import { Environment } from "src/common/point-of-sale/types.pos";
import * as moment from 'moment-timezone';

interface CreditNoteTelweb {
    env: Environment;
    impuestos: any;
    settingsBranchOffice: BranchOfficeSetting;
    invoice: InvoiceSat;
    concepts: ConceptWithTaxes[] | any[];
    receiver: Partial<XmlReceptorAttribute>;
    relations: MiniStoreInvoice[] | AcademyChargeInvoice[] | SchoolChargesInvoice[];
}
export async function CreditNote(payload: CreditNoteTelweb): Promise<string> {
    const { env, settingsBranchOffice, invoice, receiver, relations = [], concepts = [], impuestos = {} } = payload
    const { instancePath, xslt } = env

    const cerSAT = `${instancePath}CSD/` + settingsBranchOffice.cerCSD;
    const keySAT = `${instancePath}CSD/` + settingsBranchOffice.keyCSD;
    let totalImpuestosRetenidos = 0;
    const fecha = moment.tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss');
    const cfdiAttributes: Comprobante = {
        Serie: invoice.Serie,
        Folio: invoice.Folio,
        Fecha: fecha,
        Sello: '',
        FormaPago: invoice.FormaPago,
        NoCertificado: '',
        Certificado: '',
        SubTotal: invoice.SubTotal,
        Descuento: invoice.Descuento ? invoice.Descuento : '0',
        Moneda: invoice.Moneda,
        Total: invoice.Total,
        TipoDeComprobante: invoice.TipoDeComprobante,
        MetodoPago: invoice.MetodoPago,
        LugarExpedicion: invoice.LugarExpedicion,
        Exportacion: ExportacionEnum.NoAplica
    }
    const cfdi = new CFDI(cfdiAttributes, { debug: true, xslt });
    await cfdi.setAttributesXml({ version: '1.0', encoding: 'utf-8' });
    const emisor = new Emisor({
        Rfc: settingsBranchOffice.rfc,
        Nombre: settingsBranchOffice.businessName,
        RegimenFiscal: settingsBranchOffice.regime,
    });
    const receptor = new Receptor({
        Nombre: receiver.Nombre,
        Rfc: receiver.Rfc,
        UsoCFDI: receiver.UsoCFDI,
        DomicilioFiscalReceptor: receiver.DomicilioFiscalReceptor,
        RegimenFiscalReceptor: receiver.RegimenFiscalReceptor
    })

    await cfdi.emisor(emisor);
    await cfdi.receptor(receptor);
    concepts.map(async (concept) => {
        const concepto = new Concepts({
            ClaveProdServ: concept.claveProd,
            Descripcion: concept.descrption,
            Descuento: concept.discountTotal,
            Cantidad: concept.quantity,
            Importe: concept.importe,
            ObjetoImp: concept.objectoImp,
            ValorUnitario: concept.unitPrice,
            ClaveUnidad: concept.ClaveUnidad,
        });
        if (concept.impuestos && concept.impuestos.trasladado) {
            const { trasladado } = concept.impuestos
            console.log("trasladado", trasladado)
            concepto.traslado({
                Importe: trasladado.Importe,
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Base: trasladado.Base,
            });
        }
        if (typeof concept.impuestosRetenidos !== 'undefined') {
            totalImpuestosRetenidos += Number(concept.impuestosRetenidos.Importe);
            concepto.retencion({
                Importe: concept.impuestosRetenidos.Importe,
                Impuesto: concept.impuestosRetenidos.Impuesto,
                TasaOCuota: concept.impuestosRetenidos.TasaOCuota,
                TipoFactor: concept.impuestosRetenidos.TipoFactor,
                Base: concept.impuestosRetenidos.Base,
            });
        }
        await cfdi.concepto(concepto);
    });

    if (impuestos.translados.Base > 0) {
        const impuestosTransladados = new Impuestos({
            TotalImpuestosTrasladados: impuestos.translados.Importe
        });
        await impuestosTransladados.traslados({
            Base: impuestos.translados.Base,
            Impuesto: '002',
            TipoFactor: 'Tasa',
            TasaOCuota: '0.160000',
            Importe: impuestos.translados.Importe,
        });
        await cfdi.impuesto(impuestosTransladados);
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
    const relation = new Relacionado({ TipoRelacion: '01' })
    for (const document of relations) {
        await relation.addRelation(document.uuid);
    }
    await cfdi.relacionados(relation);
    await cfdi.certificar(cerSAT);
    await cfdi.sellar(keySAT, settingsBranchOffice.password);
    return await cfdi.getXmlCdfi();


}