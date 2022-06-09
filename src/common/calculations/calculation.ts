import Decimal from 'decimal.js';
import { ivaFromFinalAmount } from '../numbers';
import { divQuantity, getTotalAfterExtraCharge, getTranslados, mulQuantity, subQuantity, sumQuantity, totalAmountConcept, totalAmountConceptAfterExtraCharge } from '../point-of-sale/point-of-sale';
import { Charge, ChargesDetails, Detalles, FacturaDetalles, InvoiceModules, Payment } from '../point-of-sale/types.pos';
import { getMoreDatails } from '../point-of-sale/utils';

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
    let totalBase = 0;
    details.forEach((concept) => {
        const cargos = getCharges({ concept, type, iva: ivaDefault})
        totalBase = parseFloat(Decimal.add(cargos.total, totalBase).toFixed(2));
    });

    const base = (pago / totalBase) || 1;
    
    const generalizedConcepts: any[] = [];
    details.forEach((detail) => {
        const cargos = getCharges({ concept: detail, type, iva: ivaDefault});
        resultad.discount = Decimal.mul(Decimal.add(cargos.amountDiscount, resultad.discount),base).toNumber();
        resultad.surcharges = Decimal.mul(Decimal.add(cargos.data.recargos, resultad.surcharges),base).toNumber();
        resultad.subtotal = Decimal.mul(Decimal.add(cargos.subtotal, resultad.subtotal),base).toNumber();
        const nativeCalculo = ivaFromFinalAmount(Decimal.mul(cargos.total,base).toNumber(), -2, ivaDefault);
        const concept = {
            id: detail.id,
            quantity: detail.quantity,
            process: {
                detalle: {
                    detailTotal: detail.price,
                    totalNative: parseFloat(cargos.total.toFixed(2)),
                    nativeCalculo,
                    importe: parseFloat(cargos.price.amount.toFixed(2))
                },
                concept: {
                    conceptPrice: detail.price,
                    totalBase: detail.price,
                    totalMasRecargo: parseFloat(Decimal.add(detail.price, cargos.data.recargos).toFixed(2)),
                    unitPrice: parseFloat(cargos.price.priceUnit.toFixed(2)),

                },
                discount: {
                    discount: parseFloat(cargos.amountDiscount.toFixed(2)),
                    discountTotal: parseFloat(cargos.amountDiscount.toFixed(2)),
                    discountBase: parseFloat(cargos.amountDiscount.toFixed(2)),
                    unitDiscount: parseFloat(cargos.amountDiscount.toFixed(2)),
                },
                recargos: {
                    recargos: parseFloat(cargos.data.recargos.toFixed(2)),
                    surchargesTotal: parseFloat(cargos.data.recargos.toFixed(2)),
                    surchargesBase: parseFloat(cargos.data.recargos.toFixed(2)),
                },
                becas: {
                    becas: parseFloat(cargos.data.becas.toFixed(2)),
                    scholarshipsTotal: parseFloat(cargos.data.becas.toFixed(2)),
                    scholarshipsBase: parseFloat(cargos.data.becas.toFixed(2)),
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

            resultad.impuestos.translados.Base = Decimal.add(Decimal.mul(cargos.base,base), resultad.impuestos.translados.Base).toNumber();
            resultad.impuestos.translados.Importe = Decimal.add(Decimal.mul(cargos.iva,base), resultad.impuestos.translados.Importe).toNumber();
            concept.impuestos = {
                trasladado: {
                    Base: Decimal.mul(cargos.base,base).toNumber(),
                    Importe: Decimal.mul(cargos.iva,base).toNumber()
                }
            }
        }
        resultad.total = Decimal.add(Decimal.mul(cargos.total,base), resultad.total).toNumber();
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
    const detailTotal =  totalAmountConcept(concept);
    const price = concept.price
    switch (type) {
        case 1:
            //ACADEMIA DESCUENTO SOBRE DESCUENTO
            let becas = new Decimal(getTotalAfterExtraCharge({ total: detailTotal, extraCharges, typeExtraCharges: 3 }));
            let discount = new Decimal(getTotalAfterExtraCharge({ total: becas.toNumber(), extraCharges, typeExtraCharges: 1 }));
            let recargos = new Decimal(getTotalAfterExtraCharge({ total: discount.toNumber(), extraCharges, typeExtraCharges: 2 }));
            obj.data = {
                becas: Decimal.sub(price, becas),
                recargos: Decimal.sub(discount, recargos),
                discount: Decimal.sub(price, discount)
            }
            obj.amountDiscount = Decimal.div(Decimal.mul(concept.quantity, obj.data.discount), iva);
            let priceWithoutIva = Decimal.div(
                //precio con iva + recargos / iva
                Decimal.mul(
                    Decimal.add(
                        price,
                        obj.data.recargos
                    ),
                    concept.quantity),
                iva
            );
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

            break;
        default:
            // TIENDA Y COLEGIO DESCUENTOS NORMALES
            // obj.proccess.discount = totalAmountConceptAfterExtraCharge(concept, 1);
            // obj.proccess.recargos = totalAmountConceptAfterExtraCharge(concept, 2);
            // obj.proccess.becas = totalAmountConceptAfterExtraCharge(concept, 3);
            // obj.proccess.discountTotal = Decimal.sub(detailTotal, obj.proccess.discount);
            // obj.proccess.scholarshipsTotal, obj.scholarship = Decimal.sub(detailTotal, obj.proccess.becas);
            // obj.proccess.surchargesTotal, obj.surcharge = Decimal.sub(detailTotal, obj.proccess.recargos);
            // obj.discount = Decimal.sum(obj.scholarship, obj.proccess.discountTotal);
            // obj.subtotal = Decimal.sub(Decimal.sum(obj.surcharge,detailTotal),obj.discount);
            break;
    }
    return obj;
}

