import { CFDI, Comprobante, Concepts, Emisor, FormaPago, FormaPagoType, Iedu, Impuestos, Receptor, XmlIeduAttribute } from '@signati/core';
import { ObjetoImpEnum, XmlConceptoAttributes } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import { ExportacionEnum } from '@signati/core/lib/signati/types/Catalogs/FormaPago'
import { mulQuantity, subQuantity, sumQuantity } from '../../../../common/point-of-sale/point-of-sale';
import { CFDIWebtel, Environment, FacturaDetalles, InvoiceDetails } from '../../../../common/point-of-sale/miniStore-point-of-sale';
import * as moment from 'moment-timezone';
import { add } from 'exact-math';
import { sanitizeStringToXml } from '../../../../common/utils/sanitizeStringToXml';
import { NotInvoiced } from '../../../../common/interface/not-invoiced.interface';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { MonthEnum, PeriodicityEnum } from '../../../../common/dto/not-invoiced.dto';
import { ivaFromFinalAmount } from '../../../../common/numbers';

const genericRFC = ['XEXX010101000', 'XAXX010101000'];

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
    const {instancePath, xslt} = env
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
        LugarExpedicion: emisor.zip,
        Exportacion: ExportacionEnum.NoAplica
    };
    const cfd = new CFDI(comprobante, {
        debug: true,
        xslt,
    });

    const isGeneric = genericRFC.includes(receptor.Rfc.replace(/\s/g, ''))

    if (isGeneric) {
        await cfd.informacionGlobal(informacionGlobal)
    }

    const emi = new Emisor({
        Rfc: sanitizeStringToXml(emisor.rfc.trim().toUpperCase()),
        Nombre: sanitizeStringToXml(emisor.businessName.trim().toUpperCase()),
        RegimenFiscal: emisor.fiscalRegime.trim().toUpperCase(),
    });
    await cfd.emisor(emi);

    const recep = new Receptor({
        ...receptor,
        Rfc: sanitizeStringToXml(receptor.Rfc),
        Nombre: sanitizeStringToXml(receptor.Nombre),
        DomicilioFiscalReceptor: isGeneric ? emisor.zip : receptor.DomicilioFiscalReceptor
    });

    await cfd.receptor(recep);
    let totalTranslado = '0.00';

    for (const detalle of detalles) {
        const concepto = new Concepts({
            ClaveProdServ: detalle.claveProd,
            NoIdentificacion: detalle.NoIdentificacion,
            Cantidad: detalle.quantity,
            ClaveUnidad: detalle?.unidad || 'E48',
            Descripcion: sanitizeStringToXml(detalle.descrption),
            ValorUnitario: parseFloat(`${detalle.unitPrice}`).toFixed(2),
            Importe: parseFloat(`${detalle.importe}`).toFixed(2),
            Descuento: parseFloat(
                `${add(detalle.discountTotal, detalle?.scholarships || 0)}`,
            ).toFixed(2),
            ObjetoImp: detalle?.objectoImp || ObjetoImpEnum.SíObjetoDeImpuesto
        } as XmlConceptoAttributes);
        if (importeImpuesto !== 0 && detalle.objectoImp === ObjetoImpEnum.SíObjetoDeImpuesto) {
            concepto.traslado({
                Base: subQuantity(detalle.importe, detalle.discountTotal, -2).toString(),
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Importe: mulQuantity(subQuantity(detalle.importe, detalle.discountTotal, -2), importeImpuesto, -2).toString(),
            });
        }
        totalTranslado = sumQuantity(mulQuantity(subQuantity(detalle.importe, detalle.discountTotal, -2), importeImpuesto, -2), totalTranslado).toString();
        await cfd.concepto(concepto);
    }

    const impuesto: Impuestos = new Impuestos({
        TotalImpuestosTrasladados: totalTranslado,
    });

    if (importeImpuesto !== 0) {
        impuesto.traslados({
            Base: parseFloat(`${subQuantity(subtotal, discount)}`).toFixed(2),
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
    const {instancePath, xslt} = env
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
    const cfd = new CFDI(comprobante, {debug: true, xslt});

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

    const recep = new Receptor({
        ...receptor,
        Rfc: sanitizeStringToXml(receptor.Rfc),
        Nombre: sanitizeStringToXml(receptor.Nombre),
        DomicilioFiscalReceptor: isGeneric ? emisor.zip : receptor.DomicilioFiscalReceptor
    });

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

export type GlobalInvoiceParams = {
    branchOfficeConfig: BranchOfficeSetting,
    env: Environment,
    folio: string,
    wayPayment: FormaPago;
    details: InvoiceDetails;
    infoGlobal: {
        periodicity: PeriodicityEnum;
        month: MonthEnum;
        year: string;
    },
    percentageTax: string
}

export const GenerateGlobalInvoice = async (params: GlobalInvoiceParams): Promise<any> => {
    const {details, branchOfficeConfig, env, folio, wayPayment, infoGlobal, percentageTax} = params;

    const {keyCSD, cerCSD, serieFacturacion} = branchOfficeConfig;

    const {instancePath, xslt} = env;

    const {discount, taxes, total, subtotal, details: concepts} = details;

    const {periodicity, month, year} = infoGlobal;

    const today = moment.tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss');

    const key: string = `${instancePath}CSD/${keyCSD}`;
    const cer: string = `${instancePath}CSD/${cerCSD}`;

    const comprobante: Comprobante = {
        Version: '4.0',
        Serie: serieFacturacion,
        Folio: folio,
        Fecha: today,
        Sello: '',
        FormaPago: wayPayment,
        NoCertificado: '',
        Certificado: '',
        SubTotal: parseFloat(`${subtotal}`).toFixed(2),
        Descuento: parseFloat(`${discount}`).toFixed(2),
        Moneda: 'MXN',
        Total: parseFloat(`${total}`).toFixed(2),
        TipoDeComprobante: 'I',
        Exportacion: ExportacionEnum.NoAplica,
        MetodoPago: 'PUE',
        LugarExpedicion: branchOfficeConfig.zip.trim().toUpperCase(),
    };

    const emitter = new Emisor({
        Rfc: sanitizeStringToXml(branchOfficeConfig.rfc.trim().toUpperCase()),
        Nombre: sanitizeStringToXml(branchOfficeConfig.businessName.trim().toUpperCase()),
        RegimenFiscal: branchOfficeConfig.fiscalRegime.trim().toUpperCase(),
    });

    const receiver = new Receptor({
        Rfc: 'XAXX010101000',
        Nombre: 'PUBLICO EN GENERAL',
        DomicilioFiscalReceptor: branchOfficeConfig.zip.trim().toUpperCase(),
        RegimenFiscalReceptor: '616',
        UsoCFDI: 'S01'
    });

    const cfd = new CFDI(comprobante, {
        debug: true,
        xslt,
    });

    await cfd.emisor(emitter);

    await cfd.receptor(receiver);

    await cfd.informacionGlobal({
        Año: year,
        Meses: month,
        Periodicidad: periodicity
    });


    for (const payload of concepts) {
        const {iva, amountWithOutIva} = ivaFromFinalAmount(payload.amount, -2, sumQuantity(percentageTax, 1));

        const amount = parseFloat(`${amountWithOutIva}`).toFixed(2);
        const tax = parseFloat(`${iva}`).toFixed(2);

        const concept = new Concepts({
            ClaveProdServ: payload.keyProdServ,
            NoIdentificacion: payload.noIdentity,
            Cantidad: payload.quantity,
            ClaveUnidad: payload.keyUnit,
            Descripcion: payload.description,
            ValorUnitario: amount,
            Importe: amount,
            Descuento: payload.discount,
            ObjetoImp: payload.objectImp
        } as XmlConceptoAttributes);

        if (percentageTax !== '0' && payload.objectImp === ObjetoImpEnum.SíObjetoDeImpuesto) {
            concept.traslado({
                Base: amount,
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Importe: tax,
            });
        }

        await cfd.concepto(concept);
    }

    const impuesto: Impuestos = new Impuestos({
        TotalImpuestosTrasladados: taxes.toFixed(2),
    });

    if (percentageTax !== '0') {
        impuesto.traslados({
            Base: subtotal.toFixed(2),
            Impuesto: '002',
            TipoFactor: 'Tasa',
            TasaOCuota: '0.160000',
            Importe: taxes.toFixed(2),
        });
        await cfd.impuesto(impuesto);
    }

    await cfd.certificar(cer);

    await cfd.sellar(key, branchOfficeConfig.password);

    return cfd.getXmlCdfi();
}
