import { CFDI, Comprobante, Concepts, Emisor, Impuestos, Receptor } from '@signati/core';
import { XmlConceptoAttributes } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import { mulQuantity, subQuantity, sumQuantity } from '../../../../common/point-of-sale/point-of-sale';
import { FacturaDetalles } from '../../../../common/point-of-sale/miniStore-point-of-sale';
import * as moment from 'moment-timezone';
import { XmlReceptorAttribute } from '@signati/core/lib/signati/types/Tags/receptor.inteface';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';

export async function GenerateInvoice(data: { serie: string; folio: string, },
                                      codigoFormaPago:string,
                                      emisor: BranchOfficeSetting,
                                      receptor: XmlReceptorAttribute, factura: FacturaDetalles) {
    const key = '/var/www/CSD/' + emisor.keyCSD;
    const cer = '/var/www/CSD/' + emisor.cerCSD;
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
            NoIdentificacion: '23243012',
            Cantidad: detalle.quantity,
            ClaveUnidad: 'E48',
            Unidad: 'Pieza',
            Descripcion: detalle.descrption,
            ValorUnitario: detalle.unitPrice,
            Importe: detalle.importe,
            Descuento: detalle.discount,
        } as XmlConceptoAttributes);

        concepto.traslado({
            Base: subQuantity(detalle.importe, detalle.discount, -5).toString(),
            Impuesto: '002',
            TipoFactor: 'Tasa',
            TasaOCuota: '0.160000',
            Importe: mulQuantity(subQuantity(detalle.importe, detalle.discount, -5), .16, -5).toString(),
        });
        totalTranslado = sumQuantity(mulQuantity(subQuantity(detalle.importe, detalle.discount), .16), totalTranslado).toString();
        await cfd.concepto(concepto);
    }

    const impuesto: Impuestos = new Impuestos({
        TotalImpuestosTrasladados: totalTranslado,
    });

    impuesto.traslados({
        Impuesto: '002',
        TipoFactor: 'Tasa',
        TasaOCuota: '0.160000',
        Importe: totalTranslado,
    });
    await cfd.impuesto(impuesto);
    await cfd.certificar(cer);
    await cfd.sellar(key, emisor.password);
    const xml = await cfd.getXmlCdfi();
    return xml;
}
