import Decimal from 'decimal.js';
import { ivaFromFinalAmount } from '../numbers';
import { getTotalAfterExtraCharge, roundQuantity, subQuantity, totalAmountConcept } from '../point-of-sale/point-of-sale';
import { ChargesDetails, Detalles, ExtraCharges, FacturaDetalles, InvoiceModules, Payment, TotalsDetails } from '../point-of-sale/types.pos';
import { getMoreDatails } from '../point-of-sale/utils';
import { ObjetoImpEnum } from '@signati/core';

Decimal.set({ precision: 6 })

export const ConceptsPriceByPaymentBilligCalculation = <T extends Detalles>(payload: {
    payment: Payment,
    details: T[]
    type: InvoiceModules;
    ivaDefault?: number;
    ivaByDetail?: number;
    baseDefault?: number;
}): FacturaDetalles => {
    const { payment, details, type, ivaDefault = 1.16, ivaByDetail = .16, baseDefault = 0 } = payload;
    const pago = payment.quantity - payment.change;
    const resultad = {
        total: '0.00',
        subtotal: '0.00',
        discount: '0.00',
        surcharges: '0.00',
        detalles: [],
        impuestos: {
            translados: {
                Base: 0,
                Importe: 0,
            }
        }
    };
    const value = new Decimal(0);
    let totalBase = value;
    let surcharges = value;
    let becas = value;
    let discount = value;
    details.forEach((concept) => {
        const { extraCharges = [] } = concept;
        let price = getPrice(concept, type);
        const totalExtraCharge = getTotalExtraCharge(extraCharges, price, type);
        surcharges = Decimal.add(surcharges, totalExtraCharge.recargos);
        becas = Decimal.add(becas, totalExtraCharge.becas);
        discount = Decimal.add(discount, totalExtraCharge.discount);
        totalBase = Decimal.add(Decimal.mul(price, concept.quantity), totalBase)
    });

    const percentage = Decimal.div(
        Decimal.mul(pago, 100),
        Decimal.sub(
            Decimal.add(totalBase, surcharges),
            Decimal.add(becas, discount))
        ).toDecimalPlaces(6).toNumber();

    const generalizedConcepts: any[] = [];
    details.forEach((detail) => {
        const cargos = getCharges({ concept: detail, type, iva: ivaDefault, percentage: percentage == 100 ? 100.00 : percentage, priceConcept: getPrice(detail, type) });
        resultad.discount = Decimal.add(cargos.amountDiscount.toDecimalPlaces(2, Decimal.ROUND_DOWN), resultad.discount).toString();
        resultad.surcharges = Decimal.add(cargos.data.recargos.toDecimalPlaces(2, Decimal.ROUND_DOWN), resultad.surcharges).toString();
        resultad.subtotal = Decimal.add(parseFloat(cargos.price.amount.toString()).toFixed(2), resultad.subtotal).toString();
        const nativeCalculo = ivaFromFinalAmount(cargos.total.toDecimalPlaces(2, Decimal.ROUND_DOWN).toNumber(), -2, ivaDefault);
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
            unitPrice: parseFloat(cargos.price.priceUnit.toString()).toFixed(2),
            discountTotal: parseFloat(cargos.amountDiscount.toString()).toFixed(2),
            importe: parseFloat(cargos.price.amount.toString()).toFixed(2),
            surcharge: parseFloat(resultad.surcharges.toString()).toFixed(2),
            scholarships: parseFloat(cargos.data.becas.toString()).toFixed(2),
            impuestos: {},
            NoIdentificacion: 1,
            unidad: "", // descripcion de la clave de unidad
            ...getMoreDatails({ detail, type })
        };
        //
        if (ivaByDetail !== 0) {

            resultad.impuestos.translados.Base = Decimal.add(cargos.base, resultad.impuestos.translados.Base).toNumber();
            resultad.impuestos.translados.Importe = Decimal.add(cargos.iva, resultad.impuestos.translados.Importe).toNumber();
            concept.impuestos = {
                trasladado: {
                    Base: cargos.base.toNumber(),
                    Importe: cargos.iva.toNumber()
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
        generalizedConcepts.push(concept);
        //
    });
    resultad.total = Decimal.add(resultad.subtotal, resultad.impuestos.translados.Importe).toString();
    resultad.detalles = generalizedConcepts;
    if (type === InvoiceModules.SCHOOL) {
        resultad.discount = parseFloat ( new Decimal (resultad.discount).toString()).toFixed(2)
        resultad.surcharges = parseFloat ( new Decimal (resultad.surcharges).toString()).toFixed(2)
        resultad.subtotal = parseFloat(new Decimal(resultad.subtotal).toDP(1, 0).toString()).toFixed(2)
        resultad.total = parseFloat(Decimal.sub(resultad.subtotal, resultad.discount).toDP(1, 0).toString()).toFixed(2);
    }

    return resultad;
}

const getCharges = <D extends Detalles>(payload: {
    concept: D,
    type: InvoiceModules,
    iva: number;
    percentage: number,
    priceConcept: number;
}) => {
    // DESCUENTO SOBRE DESCUENTO MODULO ACADEMIAS
    const { concept, type, iva, priceConcept, percentage } = payload
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
    let priceWithoutIva = value;
    const totalExtraCharge = getTotalExtraCharge(extraCharges, priceConcept, type);
    obj.data.becas = Decimal.mul(Decimal.div(totalExtraCharge.becas, 100), percentage);
    obj.data.discount = Decimal.mul(Decimal.div(totalExtraCharge.discount, 100), percentage);
    obj.data.recargos = Decimal.mul(Decimal.div(totalExtraCharge.recargos, 100), percentage);
    switch (type) {
        case 1:
            //ACADEMIA DESCUENTO SOBRE DESCUENTO
            obj.amountDiscount = Decimal.div(Decimal.mul(concept.quantity, obj.data.discount), iva);
            break;
        default:
            // TIENDA Y COLEGIO DESCUENTOS NORMALES
            obj.amountDiscount = Decimal.div(Decimal.mul(concept.quantity, Decimal.add(obj.data.discount, obj.data.becas)), iva);
            break;
    }
    priceWithoutIva = Decimal.mul(Decimal.div(
        Decimal.div(Decimal.mul(Decimal.add(priceConcept, obj.data.recargos), concept.quantity), iva)
        , 100), percentage);
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

export const getTotalWithDetails = (details: any[]): TotalsDetails => {

    let subtotalCom = new Decimal(0.00);
    let discountCom = new Decimal(0.00);
    let recargosCom = new Decimal(0.00);
    let totalTranslado = new Decimal(0.00);
    const detalles = details.map((d: any) => {
        subtotalCom = Decimal.add(new Decimal(d.importe).toDecimalPlaces(2), subtotalCom);
        recargosCom = Decimal.add(new Decimal(d.process.recargos.recargos).toDecimalPlaces(2), recargosCom);
        discountCom = Decimal.add(new Decimal(d.discountTotal).toDecimalPlaces(2), discountCom);
        totalTranslado = Decimal.add(new Decimal(d.impuestos.trasladado.Importe).toDecimalPlaces(2), totalTranslado);
        return {
            cantidad: d.quantity,
            preciou: `${new Decimal(d.unitPrice).toDecimalPlaces(2)}`,
            descripcion: d.descrption,
            recargo: `${d.process.recargos.recargos}`,
            descuento: `${new Decimal(d.discountTotal).toDecimalPlaces(2)}`,
            beca: `${d.process.becas.becas}`,
            importe: `${new Decimal(d.importe).toDecimalPlaces(2)}`,
        };
    });
    return ({
        subtotal: subtotalCom.toDecimalPlaces(2, Decimal.ROUND_DOWN).toNumber(),
        surcharges: recargosCom.toDecimalPlaces(2, Decimal.ROUND_DOWN).toNumber(),
        discount: discountCom.toDecimalPlaces(2, Decimal.ROUND_DOWN).toNumber(),
        taxes: totalTranslado.toDecimalPlaces(2, Decimal.ROUND_DOWN).toNumber(),
        detailsReceipt: detalles,
        total:
            Decimal.add(
                Decimal.sub(
                    subtotalCom,
                    discountCom
                ),
                totalTranslado).toDecimalPlaces(2, Decimal.ROUND_DOWN).toNumber(),
    });
}

const getTotalExtraCharge = (extraCharges: ExtraCharges[], price: number, type: InvoiceModules): { becas: Decimal, recargos: Decimal, discount: Decimal } => {
    const value = new Decimal(0.00);
    let objTemp = { becas: value, recargos: value, discount: value };
    switch (type) {
        case 1:
            //ACADEMIA DESCUENTO SOBRE DESCUENTO
            objTemp.becas = new Decimal(getTotalAfterExtraCharge({ total: price, extraCharges, typeExtraCharges: 3 }));
            objTemp.discount = new Decimal(getTotalAfterExtraCharge({ total: objTemp.becas.toNumber(), extraCharges, typeExtraCharges: 1 }));
            objTemp.recargos = new Decimal(getTotalAfterExtraCharge({ total: objTemp.discount.toNumber(), extraCharges, typeExtraCharges: 2 }));
            return {
                becas: Decimal.sub(price, objTemp.becas),
                recargos: Decimal.sub(objTemp.discount, objTemp.recargos),
                discount: Decimal.sub(price, objTemp.discount)
            }
        default:
            // TIENDA Y COLEGIO DESCUENTOS NORMALES
            objTemp.becas = new Decimal(getTotalAfterExtraCharge({ total: price, extraCharges, typeExtraCharges: 3 }));
            objTemp.discount = new Decimal(getTotalAfterExtraCharge({ total: price, extraCharges, typeExtraCharges: 1 }));
            objTemp.recargos = new Decimal(getTotalAfterExtraCharge({ total: price, extraCharges, typeExtraCharges: 2 }));
            return {
                becas: Decimal.sub(price, objTemp.becas),
                recargos: Decimal.sub(price, objTemp.recargos),
                discount: Decimal.sub(price, objTemp.discount)
            }
    }
}

const getPrice = <T extends Detalles>(detail: T, type: InvoiceModules): number => {
    if (type == InvoiceModules.STORE) {
        return detail.priceWithIVA;
    } else {
        return typeof detail.price == 'string' ? parseFloat(`${detail.price}`) : detail.price;
    }
}
