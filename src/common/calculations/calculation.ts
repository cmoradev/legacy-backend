import Decimal from 'decimal.js';
import { ivaFromFinalAmount } from '../numbers';
import { getTotalAfterExtraCharge, subQuantity, totalAmountConcept } from '../point-of-sale/point-of-sale';
import { ChargesDetails, Detalles, FacturaDetalles, InvoiceModules, Payment } from '../point-of-sale/types.pos';
import { getMoreDatails } from '../point-of-sale/utils';
import { ObjetoImpEnum } from '@signati/core';

Decimal.set({ precision: 6 })

export const ConceptsPriceByPaymentBilligCalculation = <T extends Detalles>(payload: {
    payment: Payment,
    details: T[]
    type: InvoiceModules;
    ivaDefault?: number;
    ivaByDetail?: number;
}): FacturaDetalles => {
    const { payment, details, type, ivaDefault = 1.16, ivaByDetail = .16 } = payload;
    const pago = payment.quantity - payment.change;
    const resultad = {
        total: 0,
        subtotal: 0,
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
    let totalBase = new Decimal(0);
    details.forEach((concept) => {
        const cargos = getCharges({ concept, type, iva: ivaDefault })
        totalBase = Decimal.add(cargos.total, totalBase);
    });

    const base = (pago / totalBase.toNumber()) || 1;

    const generalizedConcepts: any[] = [];
    details.forEach((detail) => {
        const cargos = getCharges({ concept: detail, type, iva: ivaDefault });
        resultad.discount = Decimal.mul(Decimal.add(cargos.amountDiscount, resultad.discount), base).toNumber();
        resultad.surcharges = Decimal.mul(Decimal.add(cargos.data.recargos, resultad.surcharges), base).toNumber();
        resultad.subtotal = Decimal.mul(Decimal.add(cargos.subtotal, resultad.subtotal), base).toNumber();
        const nativeCalculo = ivaFromFinalAmount(Decimal.mul(cargos.total, base).toNumber(), -2, ivaDefault);
        const concept = {
            id: detail.id,
            quantity: detail.quantity,
            process: {
                detalle: {
                    detailTotal: detail.price,
                    totalNative: cargos.total.toDecimalPlaces(2),
                    nativeCalculo,
                    importe: cargos.price.amount.toDecimalPlaces(2)
                },
                concept: {
                    conceptPrice: detail.price,
                    totalBase: detail.price,
                    totalMasRecargo: Decimal.add(detail.price, cargos.data.recargos).toDecimalPlaces(2),
                    unitPrice: cargos.price.priceUnit.toDecimalPlaces(2),

                },
                discount: {
                    discount: cargos.data.discount.toDecimalPlaces(2),
                    discountTotal: cargos.data.discount.toDecimalPlaces(2),
                    discountBase: cargos.data.discount.toDecimalPlaces(2),
                    unitDiscount: cargos.data.discount.toDecimalPlaces(2),
                },
                recargos: {
                    recargos: cargos.data.recargos.toDecimalPlaces(2),
                    surchargesTotal: cargos.data.recargos.toDecimalPlaces(2),
                    surchargesBase: cargos.data.recargos.toDecimalPlaces(2),
                },
                becas: {
                    becas: cargos.data.becas.toDecimalPlaces(2),
                    scholarshipsTotal: cargos.data.becas.toDecimalPlaces(2),
                    scholarshipsBase: cargos.data.becas.toDecimalPlaces(2),
                },
            },
            // @ts-ignore
            objectoImp: detail.objetoImp || ObjetoImpEnum.NoobjetoDeimpuesto,
            unitPrice: Decimal.mul(cargos.price.priceUnit, base).toNumber(),
            discountTotal: Decimal.mul(cargos.amountDiscount, base).toNumber(),
            importe: Decimal.mul(cargos.price.amount, base).toNumber(),
            surcharge: Decimal.mul(resultad.surcharges, base).toNumber(),
            scholarships: Decimal.mul(cargos.data.becas, base).toNumber(),
            impuestos: {},
            NoIdentificacion: 1,
            unidad: "", // descripcion de la clave de unidad
            ...getMoreDatails({ detail, type })
        };
        //
        if (ivaByDetail !== 0) {

            resultad.impuestos.translados.Base = Decimal.add(Decimal.mul(cargos.base, base), resultad.impuestos.translados.Base).toNumber();
            resultad.impuestos.translados.Importe = Decimal.add(Decimal.mul(cargos.iva, base), resultad.impuestos.translados.Importe).toNumber();
            concept.impuestos = {
                trasladado: {
                    Base: Decimal.mul(cargos.base, base).toNumber(),
                    Importe: Decimal.mul(cargos.iva, base).toNumber()
                }
            }
        } else {
            resultad.impuestos.translados.Base = 0;
            resultad.impuestos.translados.Importe = 0;
            concept.impuestos = {
                trasladado: {
                    Base: 0,
                    Importe: 0
                }
            }
        }
        resultad.total = Decimal.add(Decimal.mul(cargos.total, base), resultad.total).toNumber();
        generalizedConcepts.push(concept);
        //
    });
    resultad.detalles = generalizedConcepts;
    if (type === InvoiceModules.SCHOOL) {
        resultad.total = subQuantity(resultad.subtotal, resultad.discount);
    }

    return resultad;
}

const getCharges = <D extends Detalles>(payload: {
    concept: D,
    type: InvoiceModules,
    iva: number
}) => {
    // DESCUENTO SOBRE DESCUENTO MODULO ACADEMIAS
    const { concept, type, iva } = payload
    const { extraCharges = [] } = concept
    const value = new Decimal(0);
    let obj: ChargesDetails = {
        base: value,
        subtotal: value,
        quantity: new Decimal(concept.quantity),
        total: value,
        iva: value,
        data: {
            becas: value,
            discount: value,
            recargos: value
        },
        amountDiscount: value,
        price: {
            amount: value,
            priceUnit: value
        },

    };
    const detailTotal = totalAmountConcept(concept);
    const price = concept.price
    let becas = value;
    let discount = value;
    let recargos = value;
    let priceWithoutIva = value;
    switch (type) {
        case 1:
            //ACADEMIA DESCUENTO SOBRE DESCUENTO
            becas = new Decimal(getTotalAfterExtraCharge({ total: detailTotal, extraCharges, typeExtraCharges: 3 }));
            discount = new Decimal(getTotalAfterExtraCharge({ total: becas.toNumber(), extraCharges, typeExtraCharges: 1 }));
            recargos = new Decimal(getTotalAfterExtraCharge({ total: discount.toNumber(), extraCharges, typeExtraCharges: 2 }));
            obj.data = {
                becas: Decimal.sub(price, becas),
                recargos: Decimal.sub(discount, recargos),
                discount: Decimal.sub(price, discount)
            }
            obj.amountDiscount = Decimal.div(Decimal.mul(concept.quantity, obj.data.discount), iva);
            priceWithoutIva = Decimal.div(
                //precio con iva + recargos / iva
                Decimal.mul(
                    Decimal.add(
                        price,
                        obj.data.recargos
                    ),
                    concept.quantity),
                iva
            );
            break;
        default:
            // TIENDA Y COLEGIO DESCUENTOS NORMALES
            becas = new Decimal(getTotalAfterExtraCharge({ total: detailTotal, extraCharges, typeExtraCharges: 3 }));
            discount = new Decimal(getTotalAfterExtraCharge({ total: detailTotal, extraCharges, typeExtraCharges: 1 }));
            recargos = new Decimal(getTotalAfterExtraCharge({ total: detailTotal, extraCharges, typeExtraCharges: 2 }));
            obj.data = {
                becas: Decimal.sub(detailTotal, becas),
                recargos: Decimal.sub(detailTotal, recargos),
                discount: Decimal.sub(detailTotal, discount)
            }
            obj.amountDiscount = Decimal.div(Decimal.mul(concept.quantity, Decimal.add(obj.data.discount, obj.data.becas)), iva);
            priceWithoutIva = Decimal.div(
                //precio con iva + recargos / iva
                Decimal.mul(
                    Decimal.add(
                        detailTotal,
                        obj.data.recargos
                    ),
                    concept.quantity),
                iva
            );
            break;
    }
    obj.price.priceUnit = Decimal.div(
        //precio sin iva
        priceWithoutIva,
        //cantidad
        concept.quantity
    );
    obj.price.amount = Decimal.mul(obj.price.priceUnit, concept.quantity);
    obj.base = Decimal.sub(priceWithoutIva, obj.amountDiscount);
    obj.iva = Decimal.mul(obj.base, Decimal.sub(iva, 1));
    obj.subtotal = priceWithoutIva;
    obj.total = Decimal.add(obj.base, obj.iva);
    return obj;
}

