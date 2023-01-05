import {
    CFDI,
    Comprobante,
    Concepts,
    Emisor,
    FormaPago,
    FormaPagoType,
    Iedu,
    Impuestos,
    Receptor,
    XmlIeduAttribute
} from '@signati/core';
import { ObjetoImpEnum, XmlConceptoAttributes } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import { ExportacionEnum } from '@signati/core/lib/signati/types/Catalogs/FormaPago'
import { sumQuantity } from '../../../point-of-sale/point-of-sale';
import * as moment from 'moment-timezone';
import { sanitizeStringToXml } from '../../sanitizeStringToXml';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { MonthEnum, PeriodicityEnum } from '../../../dto/not-invoiced.dto';
import { ivaFromFinalAmount } from '../../../numbers';
import { CFDIWebtel, Environment, InvoiceDetails, InvoiceModules } from '../../../point-of-sale/types.pos';
import {
    initializeCfdi, Comprobante as ComprobanteCfdi,
    MonedaEnum,
    TipoComprobanteEnum,
    ExportacionEnum as ExportacionEnumMunyaal,
    MetodoPagoEnum, ComprobanteEmisor,
    RegimenFiscalEnum, UsoCfdiEnum,
    ComprobanteReceptor, ComprobanteImpuestos,
    ComprobanteImpuestosTraslado, ImpuestoEnum,
    TipoFactorEnum, ComprobanteConcepto,
    ComprobanteConceptoImpuestos, ComprobanteConceptoImpuestosTraslado,
    ObjetoImpEnum as ObjetoImpEnumMunyaal,
    Iedu as IeduMunyaal,
    ComprobanteConceptoComplementoConcepto, ComprobanteInformacionGlobal, MesesEnum, PeriodicidadEnum,
} from "@munyaal/cfdi";
import { FactSw } from '../../../../webService/FactSw';
import { A117 } from '../../../../pdf/A117/desing/A117';
import { readFileSync } from 'fs';
import { PDF } from '@signati/pdf';

const genericRFC = ['XEXX010101000', 'XAXX010101000'];

export async function GenerateInvoice(payload: CFDIWebtel): Promise<string> {
    const {
        folio,
        serie,
        informacionGlobal,
        emisor,
        taxes,
        totals,
        concepts,
        receptor,
        codigoFormaPago,
        env,
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
        SubTotal: totals.fiscal.SubTotal,
        Descuento: totals.fiscal.Descuento,
        Total: totals.fiscal.Total,
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

    for (const cts of concepts.conceptsInvoice) {
        const concepto = new Concepts({ ...cts.concept });
        if (importeImpuesto !== 0 && cts.concept.ObjetoImp === ObjetoImpEnum.SíObjetoDeImpuesto) {

            concepto.traslado({
                Base: cts.base,
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.16',
                Importe: cts.import,
            });
        }
        await cfd.concepto(concepto);
    }

    const impuesto: Impuestos = new Impuestos({
        TotalImpuestosTrasladados: taxes.amount,
    });

    if (importeImpuesto !== 0) {
        impuesto.traslados({
            Base: taxes.base,
            Impuesto: '002',
            TipoFactor: 'Tasa',
            TasaOCuota: '0.16',
            Importe: taxes.amount,
        });
        await cfd.impuesto(impuesto);
    }
    await cfd.certificar(cer);
    await cfd.sellar(key, emisor.password);
    const xml = await cfd.getXmlCdfi();
    console.log(xml)
    return xml;
}

export async function GenerateInvoiceIedu(payload: CFDIWebtel & { student: XmlIeduAttribute }): Promise<string> {
    const {
        folio,
        serie,
        taxes,
        totals,
        concepts,
        informacionGlobal,
        emisor,
        receptor,
        codigoFormaPago,
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
        SubTotal: totals.fiscal.SubTotal,
        Descuento: totals.fiscal.Descuento,
        Total: totals.fiscal.Total,
        Moneda: 'MXN',
        TipoDeComprobante: 'I',
        MetodoPago: 'PUE',
        LugarExpedicion: emisor.zip, // ,
        Exportacion: ExportacionEnum.NoAplica
    };
    const cfd = new CFDI(comprobante, { debug: true, xslt });

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
    for (const ctp of concepts.conceptsInvoice) {
        const concepto = new Concepts(ctp.concept);
        const ieduObject: XmlIeduAttribute = student;
        const iedu = new Iedu(ieduObject);
        await concepto.complemento(iedu);
        await cfd.concepto(concepto);
    }
    const impuesto: Impuestos = new Impuestos({
        TotalImpuestosTrasladados: '0',
    });

    impuesto.traslados({
        Base: '1.00',
        Impuesto: '002',
        TipoFactor: 'Exento',
    });
    await cfd.impuesto(impuesto);

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
    const { details, branchOfficeConfig, env, folio, wayPayment, infoGlobal, percentageTax } = params;

    const { keyCSD, cerCSD, serieFacturacion } = branchOfficeConfig;

    const { instancePath, xslt } = env;

    const { discount, taxes, total, subtotal, details: concepts } = details;

    const { periodicity, month, year } = infoGlobal;

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
        const { iva, amountWithOutIva } = ivaFromFinalAmount(payload.amount, -2, sumQuantity(percentageTax, 1));

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
                TasaOCuota: '0.16',
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
            TasaOCuota: '0.16',
            Importe: taxes.toFixed(2),
        });
        await cfd.impuesto(impuesto);
    }

    await cfd.certificar(cer);

    await cfd.sellar(key, branchOfficeConfig.password);

    return cfd.getXmlCdfi();
}

export interface InvoiceModule extends CFDIWebtel {
    type: InvoiceModules;
    Moneda: MonedaEnum;
    TipoDeComprobante: TipoComprobanteEnum;
    Exportacion: ExportacionEnumMunyaal;
    MetodoPago: MetodoPagoEnum;
    student?: XmlIeduAttribute;
}

export const GenerateInvoiceMunyaal = async (params: InvoiceModule) => {
    const {
        Moneda,
        MetodoPago,
        TipoDeComprobante,
        Exportacion,
        folio,
        serie,
        informacionGlobal,
        emisor,
        taxes,
        totals,
        concepts,
        receptor,
        codigoFormaPago,
        env,
        type,
        student
    } = params;
    const CFDIService = initializeCfdi({
        pathXsltCfdi40: env.xslt,
        password: emisor.password,
        pathKey: env.instancePath + 'CSD/' + emisor.keyCSD,
        pathCertificate: env.instancePath + 'CSD/' + emisor.cerCSD,
    })

    let folder = getFolderComprobantes(type, env.instancePath);

    CFDIService.overridePaths({
        pathXmlFolder: folder
    });


    const comprobante = new ComprobanteCfdi({
        Version: '4.0',
        Serie: serie,
        Folio: folio,
        Fecha: moment.tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss'),
        FormaPago: codigoFormaPago,
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
        RegimenFiscal: emisor.fiscalRegime as RegimenFiscalEnum
    });

    comprobante.Receptor = new ComprobanteReceptor({
        Rfc: receptor.Rfc,
        Nombre: receptor.Nombre,
        UsoCFDI: receptor.UsoCFDI as UsoCfdiEnum,
        RegimenFiscalReceptor: receptor.RegimenFiscalReceptor as RegimenFiscalEnum,
        DomicilioFiscalReceptor: receptor.DomicilioFiscalReceptor
    });

    for (const cts of concepts.conceptsInvoice) {
        const { ClaveProdServ, Cantidad, ClaveUnidad, Descripcion, ValorUnitario, Descuento, Importe, ObjetoImp } = cts.concept
        const concepto = new ComprobanteConcepto({
            ClaveProdServ,
            Cantidad: Cantidad.toString(),
            ClaveUnidad,
            Descripcion,
            ValorUnitario: ValorUnitario.toString(),
            Descuento: Descuento.toString(),
            Importe: Importe.toString(),
            ObjetoImp: ObjetoImp as ObjetoImpEnumMunyaal
        });
        if (type !== InvoiceModules.SCHOOL && cts.concept.ObjetoImp === ObjetoImpEnum.SíObjetoDeImpuesto) {
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
        } else {
            concepto.ComplementoConcepto = new ComprobanteConceptoComplementoConcepto();
            concepto.ComplementoConcepto.iedu = new IeduMunyaal(student);
        }
        comprobante.Conceptos.push(concepto);
    }

    const impuestos = new ComprobanteImpuestos({
        TotalImpuestosTrasladados: taxes.amount,
    });

    if (type !== InvoiceModules.SCHOOL) {

        const traslado = new ComprobanteImpuestosTraslado({
            Base: taxes.base,
            Impuesto: ImpuestoEnum.I002,
            TasaOCuota: '0.160000',
            Importe: taxes.amount,
            TipoFactor: TipoFactorEnum.Tasa
        });

        impuestos.Traslados.push(traslado);
    }

    comprobante.Impuestos = impuestos;

    return FullGenerateXml(comprobante, CFDIService,folder, `${env.instancePath}logos/tienditalogo.png`, emisor.address)

};

export const GenerateGlobalInvoiceMunyaal = async (params: GlobalInvoiceParams & {
    type: InvoiceModules;
    Moneda: MonedaEnum;
    TipoDeComprobante: TipoComprobanteEnum;
    Exportacion: ExportacionEnumMunyaal;
    MetodoPago: MetodoPagoEnum;
}): Promise<any> => {
    const { details, branchOfficeConfig, env, folio, wayPayment, infoGlobal, percentageTax, type, Moneda, TipoDeComprobante, Exportacion, MetodoPago } = params;

    const { keyCSD, cerCSD, serieFacturacion, password } = branchOfficeConfig;

    const { instancePath, xslt } = env;

    const { discount, taxes, total, subtotal, details: concepts } = details;

    const { periodicity, month, year } = infoGlobal;

    const CFDIService = initializeCfdi({
        pathXsltCfdi40: env.xslt,
        password: password,
        pathKey: `${instancePath}CSD/${keyCSD}`,
        pathCertificate: `${instancePath}CSD/${cerCSD}`,
    })

    let folder = getFolderComprobantes(type, instancePath);

    CFDIService.overridePaths({
        pathXmlFolder: folder
    });

    const comprobante = new ComprobanteCfdi({
        Version: '4.0',
        Serie: serieFacturacion,
        Folio: folio,
        Fecha: moment.tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss'),
        FormaPago: wayPayment,
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
        Nombre: sanitizeStringToXml(branchOfficeConfig.businessName.trim().toUpperCase()),
        RegimenFiscal: branchOfficeConfig.fiscalRegime.trim().toUpperCase() as RegimenFiscalEnum,
    });

    comprobante.Receptor = new ComprobanteReceptor({
        Rfc: 'XAXX010101000',
        Nombre: 'PUBLICO EN GENERAL',
        DomicilioFiscalReceptor: branchOfficeConfig.zip.trim().toUpperCase(),
        RegimenFiscalReceptor: RegimenFiscalEnum.RF616,
        UsoCFDI: UsoCfdiEnum.S01
    });

    comprobante.InformacionGlobal = new ComprobanteInformacionGlobal({
        Meses: month as unknown  as MesesEnum,
        Periodicidad: periodicity as unknown as PeriodicidadEnum,
        Anio: year
    });

    for (const payload of concepts) {
        const { iva, amountWithOutIva } = ivaFromFinalAmount(payload.amount, -2, sumQuantity(percentageTax, 1));

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
            ObjetoImp: payload.objectImp as ObjetoImpEnumMunyaal
        });

        if (percentageTax !== '0' && payload.objectImp === ObjetoImpEnumMunyaal.OI02) {
            const impuestos = new ComprobanteConceptoImpuestos();

            const traslados = new ComprobanteConceptoImpuestosTraslado({
                Base: amount,
                Importe: tax,
                Impuesto: ImpuestoEnum.I002,
                TasaOCuota: '0.160000',
                TipoFactor: TipoFactorEnum.Tasa
            });

            impuestos.Traslados.push(traslados);

            concept.Impuestos = impuestos;
        }

        comprobante.Conceptos.push(concept);
    }
    const impuestos = new ComprobanteImpuestos({
        TotalImpuestosTrasladados: taxes.toFixed(2),
    });

    if (percentageTax !== '0') {

        const traslado = new ComprobanteImpuestosTraslado({
            Base: subtotal.toFixed(2),
            Impuesto: ImpuestoEnum.I002,
            TasaOCuota: '0.160000',
            Importe: taxes.toFixed(2),
            TipoFactor: TipoFactorEnum.Tasa
        });

        impuestos.Traslados.push(traslado);
    }

    comprobante.Impuestos = impuestos;

    return FullGenerateXml(comprobante, CFDIService,folder, `${env.instancePath}logos/tienditalogo.png`, branchOfficeConfig.zip.trim().toUpperCase())
}

const getFolderComprobantes = (type: InvoiceModules, path: string) => {
    let folder = `${path}comprobantes/`;
    switch (type) {
        case InvoiceModules.ACADEMY:
            return folder + 'academias/'
        case InvoiceModules.SCHOOL:
            return folder + 'colegio/'
        case InvoiceModules.STORE:
            return folder + 'tienda/'
        default:
            return folder
    }
}

const FullGenerateXml = async (comprobante: ComprobanteCfdi, CFDIService: any, path: string, logoPath: string, lugarExpedicion: string ) => {
    const xml = await CFDIService.getXMLSellado(comprobante);

    const sw = new FactSw();

    const timbrado = await sw.facturar(xml);

    await CFDIService.saveXml(timbrado.data.cfdi, timbrado.data.uuid);
    //'academiaslogo.png'
    //colegiologo
    //tienditalogo
    const logo = readFileSync(logoPath)
    const desingpdf = new A117(`${path}${timbrado.data.uuid.toUpperCase()}.xml`, {
        lugarExpedicion,
        logo: `data:image/png;base64, ${logo.toString('base64')}`,
    });
    const pdf = new PDF<A117>(desingpdf);
    await pdf.save(`${path}${timbrado.data.uuid.toUpperCase()}`);
    console.log(timbrado)
    return timbrado;
}
