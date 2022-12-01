import { add, div, mul, round, sub } from 'exact-math';
import { SystemTypeExtraChargesEnum } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { TypeChargeApplicationEnum } from '../../system/system-extra-charges/enums/system-extra-charges.enum';
import { Detalles, ExtraCharges, FacturaDetalles, InvoiceModules, Payment } from './types.pos';
import { ivaFromFinalAmount } from '../numbers';
import { ObjetoImpEnum } from '@signati/core';
import { getMoreDatails } from './utils';
export const mulQuantity = (price: number | string, quantity: number | string, decimal: number = -2) => {
    return +round(mul(price, quantity, { returnString: true }), decimal, { returnString: true, trim: false });
};

export const subQuantity = (price: number | string, quantity: number | string, decimal: number = -2) => {
    return +round(sub(price, quantity, { returnString: true }), decimal, { returnString: true, trim: false });
};

export const sumQuantity = (price: number | string, quantity: number | string, decimal: number = -2) => {
    return +round(add(price, quantity, { returnString: true }), decimal, { returnString: true, trim: false });

};

export const divQuantity = (dividiendo: number | string, divisor: number | string, decimal: number = -2) => {
    return +round(div(dividiendo, divisor, { returnString: true }), decimal, { returnString: true, trim: false });
};
export const roundQuantity = (quantity: number | string, decimal: number = -2) => {
    return +round(add(quantity, 0, { returnString: true }), decimal, { returnString: true, trim: false });
};

export function amountAfterExtraCharge(amount: number, discounts: Array<{
    type: TypeChargeApplicationEnum,
    quantity: number,
}> = []) {
    const equivalentRealDiscount = 1 - discounts
        .filter(discount => discount.type === TypeChargeApplicationEnum.percentage)
        .map(discount => {
            return (1 - (discount.quantity / 100)) || 0;
        }).reduce((previousValue, currentValue) => {
            return previousValue * currentValue;
        }, 1);
    const discountByAmount = discounts
        .filter(value => value.type === TypeChargeApplicationEnum.quantity)
        .reduce((previousValue, currentValue) => {
            return previousValue + currentValue.quantity;
        }, 0);
    const total = amount - (amount * equivalentRealDiscount) - discountByAmount;
    return total > 0 ? total : 0;
}
export const totalAmountConceptAfterExtraCharge = <D extends Detalles>(detail: D, typeExtraCharges: SystemTypeExtraChargesEnum) => {
    const total = totalAmountConcept(detail)
    const { extraCharges = [] } = detail;
    return getTotalAfterExtraCharge({
        total,
        extraCharges,
        typeExtraCharges
    })
};

export const totalAmountConcept = <D extends Detalles>(detail: D) => {
    const { quantity, } = detail
    const conceptPrice = getTotal(detail)
    return mulQuantity(conceptPrice, quantity);
};
export const getTotal = <D extends Detalles>(detail: D) => {
    const { price } = detail
    let conceptPrice = +price;
    // @ts-ignore
    if (detail.isIva) {
        // @ts-ignore
        conceptPrice = +detail.priceWithIVA;
    }
    return conceptPrice
}

export const getTotalAfterExtraCharge = (payload: {
    total: number,
    extraCharges: ExtraCharges[],
    typeExtraCharges: SystemTypeExtraChargesEnum
}) => {
    const { total, extraCharges = [], typeExtraCharges } = payload
    const cargos = extraCharges
        .filter((charge: ExtraCharges) => charge.typeExtraCharge === typeExtraCharges)
        .map((value: ExtraCharges) => ({
            quantity: value.quantity,
            type: value.applicationType
        }))

    return amountAfterExtraCharge(total, cargos);
}

const chainCharges = <D extends Detalles>(payload: {
    concept: D
}) => {
    const { concept } = payload
    const discount = totalAmountConceptAfterExtraCharge(concept, 1);
    const recargos = totalAmountConceptAfterExtraCharge(concept, 2);
    const becas = totalAmountConceptAfterExtraCharge(concept, 3);

    const detailTotal = totalAmountConcept(concept);
    const scholarshipsTotal = subQuantity(detailTotal, becas);
    const surchargesTotal = subQuantity(detailTotal, recargos);
    const discountTotal = subQuantity(detailTotal, discount);

    const totalDiscounts = sumQuantity(scholarshipsTotal, discountTotal);
    const totalMasRecargo = sumQuantity(surchargesTotal, detailTotal);
    const totalDetail = subQuantity(totalMasRecargo, totalDiscounts);
    return {
        subtotal: totalDetail,
        discount: totalDiscounts,
        surcharge: surchargesTotal,
        scholarship: scholarshipsTotal,
        proccess: {
            becas,
            discount,
            recargos,
            detailTotal,
            scholarshipsTotal,
            surchargesTotal,
            discountTotal
        }
    }
}
export const chargesOnCharges = <D extends Detalles>(concept: D) => {
    const { extraCharges = [] } = concept
    const detailTotal = totalAmountConcept(concept);

    const becas = getTotalAfterExtraCharge({ total: detailTotal, extraCharges, typeExtraCharges: 3 })
    const discount = getTotalAfterExtraCharge({ total: becas, extraCharges, typeExtraCharges: 1 })
    const recargos = getTotalAfterExtraCharge({ total: discount, extraCharges, typeExtraCharges: 2 })

    const scholarshipsTotal = subQuantity(detailTotal, becas);
    const surchargesTotal = subQuantity(discount, recargos);
    const discountTotal = subQuantity(becas, discount);

    const totalMenosBeca = subQuantity(detailTotal, scholarshipsTotal)
    const totalMenosDescuento = subQuantity(totalMenosBeca, discountTotal);
    const totalMasRecargo = sumQuantity(totalMenosDescuento, surchargesTotal)
    return {
        subtotal: totalMasRecargo,
        discount: discountTotal,
        surcharge: surchargesTotal,
        scholarship: scholarshipsTotal,
        proccess: {
            becas,
            discount,
            recargos,
            detailTotal,
            scholarshipsTotal,
            surchargesTotal,
            discountTotal
        }
    }
}
export const saleDetails = <D extends Detalles>(payload: {
    details: D[]
    ivaDefault?: number,
    application?: number
}) => {

    const { details = [], ivaDefault = 1.16, application = 1 } = payload
    // tslint:disable-next-line:one-variable-per-declaration
    let subtotal = 0, surcharges = 0, discounts = 0, scholarships = 0;
    details.forEach((concept: D) => {
        const cargos = application === 1 ? chainCharges({
            concept
        }) : chargesOnCharges(concept)

        subtotal += cargos.subtotal
        discounts += cargos.discount
        surcharges += cargos.surcharge
        scholarships += cargos.scholarship

    });
    const data = {
        discounts,
        scholarships,
        surcharges,
        subtotal,
    };
    const { finalAmount, iva, amountWithOutIva } = ivaFromFinalAmount(subtotal, 0, ivaDefault);
    return {
        subtotal: amountWithOutIva,
        surcharges,
        discounts,
        taxes: +iva,
        total: +finalAmount,
        data,
    };
};


export const getTranslados = (options: {
    total: number;
    descuento: number;
    importeImpuesto: number;
}) => {
    const { total, descuento, importeImpuesto } = options;
    const base = subQuantity(total, descuento, -2).toString();
    const traslado = {
        Base: base,
        Importe: mulQuantity(base, importeImpuesto, -2).toString()
    }
    return traslado;
}
export const ConceptsPriceByPaymentBillig = <T extends Detalles>(payload: {
    payment: Payment,
    details: T[]
    type: InvoiceModules;
    ivaDefault?: number;
    ivaByDetail?: number;
    application?: number
}): FacturaDetalles => {
    const { payment, details, type, ivaDefault = 1.16, ivaByDetail = .16, application = 1 } = payload;
    const detalles = saleDetails({
        details: details || [],
        ivaDefault,
        application
    });
    const pago = payment.quantity - payment.change;
    const base = (pago / detalles.total) || 1;
    const resultad = {
        total: 0,
        subtotal: 0, // sumQuantity(ivaFromFinalAmount(pago).amountWithOutIva, '0.01'),
        discount: 0,
        surcharges: 0,
        detalles: [],
        impuestos: {
            translados: {
                Base: 0,
                Importe: 0,
            }
        }
    };
    const generalizedConcepts: any[] = [];
    details.forEach((detail) => {
        const conceptPrice = getTotal(detail)
        const proceso = application === 1 ? chainCharges({ concept: detail }) : chargesOnCharges(detail)
        const { proccess } = proceso
        const {
            becas,
            discount,
            recargos,
            detailTotal,
            scholarshipsTotal,
            surchargesTotal,
            discountTotal,
        } = proccess

        const totalBase = mulQuantity(conceptPrice, base);
        const discountBase = mulQuantity(discountTotal, base);
        const surchargesBase = mulQuantity(surchargesTotal, base);
        const scholarshipsBase = mulQuantity(scholarshipsTotal, base);

        const unitDiscount = divQuantity(discountBase, detail.quantity);

        resultad.discount = sumQuantity(discountBase, resultad.discount);
        resultad.discount = sumQuantity(scholarshipsBase, resultad.discount);
        resultad.surcharges = sumQuantity(surchargesBase, resultad.surcharges);

        const totalMasRecargo = sumQuantity(totalBase, surchargesBase)
        const totalNative = subQuantity(totalMasRecargo, unitDiscount);
        const nativeCalculo = ivaFromFinalAmount(totalNative, -2, ivaDefault);

        const unitPrice = sumQuantity(nativeCalculo.amountWithOutIva, unitDiscount);
        const importe = mulQuantity(unitPrice, detail.quantity);

        resultad.subtotal = sumQuantity(importe, resultad.subtotal);
        const concept = {
            id: detail.id,
            quantity: detail.quantity,
            process: {
                detalle: {
                    detailTotal,
                    totalNative,
                    nativeCalculo,
                    importe
                },
                concept: {
                    conceptPrice,
                    totalBase,
                    totalMasRecargo,
                    unitPrice,

                },
                discount: {
                    discount,
                    discountTotal,
                    discountBase,
                    unitDiscount
                },
                recargos: {
                    recargos,
                    surchargesTotal,
                    surchargesBase
                },
                becas: {
                    becas,
                    scholarshipsTotal,
                    scholarshipsBase
                },
            },
            // @ts-ignore
            objectoImp: detail.objetoImp || ObjetoImpEnum.NoobjetoDeimpuesto,
            unitPrice,
            discountTotal: discountBase,
            importe,
            surcharge: resultad.surcharges,
            scholarships: scholarshipsBase,
            impuestos: {},
            NoIdentificacion: 1,
            unidad: "", // descripcion de la clave de unidad
            ...getMoreDatails({ detail, type })
        };
        if (ivaByDetail !== 0) {
            const translados = getTranslados({ total: importe, descuento: discountBase, importeImpuesto: ivaByDetail });
            resultad.impuestos.translados.Base = sumQuantity(resultad.impuestos.translados.Base, translados.Base)
            resultad.impuestos.translados.Importe = sumQuantity(resultad.impuestos.translados.Importe, translados.Importe)
            concept.impuestos = {
                trasladado: translados
            }
        }
        const importeMenosDescuento = subQuantity(importe, discountBase);
        const totalconcetp = sumQuantity(importeMenosDescuento, mulQuantity(importeMenosDescuento, ivaByDetail));
        resultad.total = sumQuantity(resultad.total, totalconcetp);
        generalizedConcepts.push(concept);
    });
    resultad.detalles = generalizedConcepts;
    if (type === InvoiceModules.SCHOOL) {
        resultad.total = subQuantity(resultad.subtotal, resultad.discount);
    }

    return resultad;
};