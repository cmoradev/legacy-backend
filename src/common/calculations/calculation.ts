import { Detalles, ExtraCharges, InvoiceModules, Payment } from '../point-of-sale/types.pos';
import { getMoreDatails } from '../point-of-sale/utils';
import { ObjetoImpEnum } from '@signati/core';
import { calculateInvoicePrices, Concept, ChargeTypeEnum, Charge, ChargeApplicationEnum, FountTypeEnum, TaxPercentageEnum, ConceptAmountDetailsResult, Decimal } from '@munyaal/calculations'
import { ConceptReceipt, ConceptSchoolAndAcademy, DataInvoice, dataInvoiceInit } from './TypesCalculation';
import { sanitizeStringToXml } from '../utils/sanitizeStringToXml';
import { SystemTypeExtraChargesEnum } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { TypeChargeApplicationEnum } from '../../system/system-extra-charges/enums/system-extra-charges.enum';

export const ConceptsPriceByPaymentBilligCalculation = <T extends Detalles>(payload: {
    payment: Payment,
    details: T[]
    type: InvoiceModules;
    ivaDefault?: number;
    ivaByDetail?: number;
    typeConcept: 'Recepit' | 'Invoice'
    baseDefault?: number;
}): DataInvoice => {
    const {payment, details, type, typeConcept, ivaDefault = 1.16, ivaByDetail = .16, baseDefault = 0} = payload;

    // INICIALIZACION DEL OBJ RETORNO
    let obj: DataInvoice = dataInvoiceInit;

    let cptArray: any[] = []

    let surchargesTotal: Decimal [] = [];

    const totals = TotalWithCalculation({details, type, payment});

    totals.detailsWithPaymentApplied.concepts.forEach((concept: Concept) => {
        // SE OBTIENE LOS CALCULOS
        let cpt = {} as any;
        const conceptDetails = details.find((d) => d.id === concept.id);
        const moreDetails = getMoreDatails({detail: conceptDetails, type});
        let scholarships: Decimal[] = [];
        let discounts: Decimal[] = [];
        let surcharges: Decimal[] = [];

        concept.charges.forEach((c) => {
            if (c.id === SystemTypeExtraChargesEnum.Becas) {
                scholarships.push(c.chargeAmount)
            } else if (c.id === SystemTypeExtraChargesEnum.Descuentos) {
                discounts.push(c.chargeAmount)
            } else if (c.id === SystemTypeExtraChargesEnum.Recargos) {
                surcharges.push(c.chargeAmount)
                surchargesTotal.push(concept.chargeWithIVA)
            }
        });

        if (typeConcept === 'Recepit') {
            cpt = {
                cantidad: concept.quantity.toFixed(6),
                descripcion: moreDetails.descrption,
                descuento: discounts.length > 0 ? Decimal.sum(...discounts).toFixed(2) : '0.000',
                importe: concept.fiscalPrices.amount.toFixed(2),
                preciou: concept.fiscalPrices.unitPrice?.toFixed(2),
                recargo: surcharges.length > 0 ? Decimal.sum(...surcharges).toFixed(2) : '0.000',
            } as ConceptReceipt;
            if (type !== InvoiceModules.STORE) {
                cpt = {...cpt, beca: scholarships.length > 0 ? Decimal.sum(...scholarships).toFixed(2) : '0.00',} as ConceptSchoolAndAcademy
            }
        } else {
            cpt = {
                concept: {
                    ClaveProdServ: moreDetails.claveProd,
                    NoIdentificacion: `1`,
                    Cantidad: concept.quantity.toFixed(6),
                    ClaveUnidad: moreDetails?.ClaveUnidad || 'E48',
                    Descripcion: sanitizeStringToXml(moreDetails.descrption),
                    ValorUnitario: concept.fiscalPrices.unitPrice?.toFixed(6),
                    Importe: concept.fiscalPrices.amount.toFixed(6),
                    Descuento: concept.fiscalPrices.discount.toFixed(6),
                    ObjetoImp: conceptDetails.objetoImp || ObjetoImpEnum.NoobjetoDeimpuesto
                },
                base: '',
                import: ''
            };
            if (ivaByDetail !== 0 && conceptDetails.objetoImp === ObjetoImpEnum.SíObjetoDeImpuesto) {
                cpt.base = concept.fiscalPrices.baseTax.toFixed(6);
                cpt.import = concept.fiscalPrices.tax.toFixed(6);
            }
        }
        cptArray.push(cpt)
    });

    if (typeConcept === 'Recepit') {
        if (type === InvoiceModules.STORE) {
            obj.concepts.conceptsMiniStore = cptArray
        } else {
            obj.concepts.conceptsSchoolAndAcademy = cptArray
        }
    } else {
        obj.concepts.conceptsInvoice = cptArray;
    }
    obj.taxes = {
        base: totals.detailsWithPaymentApplied.baseTax.toFixed(6),
        amount: totals.detailsWithPaymentApplied.tax.toFixed(6),
    }
    obj.totals.fiscal.SubTotal = totals.detailsWithPaymentApplied.amount.toFixed(2)
    obj.totals.fiscal.Descuento = totals.detailsWithPaymentApplied.discount.toFixed(2)
    obj.totals.fiscal.Total = totals.detailsWithPaymentApplied.total.toFixed(2)
    obj.totals.receipt = {
        SubTotal: obj.totals.fiscal.SubTotal,
        Descuento: obj.totals.fiscal.Descuento,
        Total: obj.totals.fiscal.Total,
        Recargo: surchargesTotal.length > 0 ? Decimal.sum(...surchargesTotal).toFixed(2) : '0.000',
        Impuesto: obj.taxes.amount,
    }
    return obj

}

const TotalWithCalculation = <T extends Detalles>(payload: {
    details: T[],
    type: InvoiceModules,
    payment: Payment
}): {
    detailsWithPaymentApplied: ConceptAmountDetailsResult;
    detailsWithoutPaymentApplied: ConceptAmountDetailsResult;
} => {
    const {details, type, payment} = payload;
    const concepts: Concept[] = details.map((d) => {
        const charges: Charge[] = d.extraCharges.map((e: ExtraCharges) => {
            let order = 1;
            if (type === InvoiceModules.ACADEMY && e.typeExtraCharge === SystemTypeExtraChargesEnum.Becas) {
                order = 1;
            } else if (type === InvoiceModules.ACADEMY && e.typeExtraCharge === SystemTypeExtraChargesEnum.Descuentos) {
                order = 2;
            } else if (type === InvoiceModules.ACADEMY && e.typeExtraCharge === SystemTypeExtraChargesEnum.Recargos) {
                order = 3;
            }
            return {
                id: e.typeExtraCharge,
                amount: e.quantity,
                order,
                type: e.typeExtraCharge !== SystemTypeExtraChargesEnum.Recargos ? ChargeTypeEnum.DISCOUNTS : ChargeTypeEnum.SURCHARGES,
                application: e.applicationType === TypeChargeApplicationEnum.percentage ? ChargeApplicationEnum.PERCENTAGE : ChargeApplicationEnum.QUANTITY
            } as Charge
        })
        return {
            id: d.id,
            quantity: d.quantity,
            basePrice: getPrice(d, type),
            name: getMoreDatails({detail: d, type}).descrption,
            charges,
        } as Concept
    });
    return calculateInvoicePrices({
        payment: {
            amount: payment.quantity,
            change: payment.change
        },
        concepts,
        fountType: type === InvoiceModules.ACADEMY ? FountTypeEnum.DISCOUNT_ON_DISCOUNT : FountTypeEnum.TRADITIONAL,
        ivaPercentage: type === InvoiceModules.SCHOOL ? TaxPercentageEnum.T0 : TaxPercentageEnum.T16
    })
}

const getPrice = <T extends Detalles>(detail: T, type: InvoiceModules): number => {
    if (type === InvoiceModules.STORE) {
        return detail.priceWithIVA;
    } else {
        return typeof detail.price === 'string' ? parseFloat(`${detail.price}`) : detail.price;
    }
}
