import { add, div, mul, round, sub } from 'exact-math';
import { AcademyChargeDetails } from '../../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { MiniStoreSaleDetail } from '../../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { SchoolChargeDetails } from '../../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
import { SystemTypeExtraChargesEnum } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { TypeChargeApplicationEnum } from '../../system/system-extra-charges/enums/system-extra-charges.enum';
import { FacturaDetalles, InvoiceModules, TypeDetails } from './types.pos';
import { ivaFromFinalAmount } from '../numbers';
import { AcademyChargePayments } from '../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { SchoolChargePayment } from '../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';

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
export const totalAmountConceptAfterExtraCharge = (detail: TypeDetails, typeExtraCharges: SystemTypeExtraChargesEnum) => {
    const total = totalAmountConcept(detail)
    const { extraCharges = [] } = detail;
    // @ts-ignore
    return amountAfterExtraCharge(total, extraCharges.map((value) => {
        return value.typeExtraCharge === typeExtraCharges ?
            {
                quantity: value.quantity,
                type: value.applicationType,
            } : {
                quantity: 0,
                type: value.applicationType,
            };
    }));
};

export const totalAmountConcept = (detail: MiniStoreSaleDetail | SchoolChargeDetails | AcademyChargeDetails) => {
    const { quantity, } = detail
    const conceptPrice = getTotal(detail)
    return mulQuantity(conceptPrice, quantity);
};
export const getTotal = (detail: MiniStoreSaleDetail | SchoolChargeDetails | AcademyChargeDetails) => {
    const { price } = detail
    let conceptPrice = +price;
    // @ts-ignore
    if (detail.isIva) {
        // @ts-ignore
        conceptPrice = +detail.priceWithIVA;
    }
    return conceptPrice
}

export const saleDetails = (details: SchoolChargeDetails[] | AcademyChargeDetails[] | MiniStoreSaleDetail[]) => {

    // tslint:disable-next-line:one-variable-per-declaration
    let subtotal = 0, surcharges = 0, discounts = 0, scholarships = 0;
    details.forEach((concept: SchoolChargeDetails | AcademyChargeDetails | MiniStoreSaleDetail) => {
        subtotal += totalAmountConcept(concept);
        discounts += totalAmountConceptAfterExtraCharge(concept, SystemTypeExtraChargesEnum.Descuentos);
        surcharges += totalAmountConceptAfterExtraCharge(concept, SystemTypeExtraChargesEnum.Recargos);
        scholarships += totalAmountConceptAfterExtraCharge(concept, SystemTypeExtraChargesEnum.Becas);
    });

    discounts = sub(subtotal, discounts);
    scholarships = sub(subtotal, scholarships);
    discounts = add(scholarships, discounts);
    surcharges = sub(subtotal, surcharges);
    subtotal = sub(add(subtotal, surcharges), discounts);
    const data = {
        discounts,
        scholarships,
        surcharges,
        subtotal,
    };
    const { finalAmount, iva, amountWithOutIva } = ivaFromFinalAmount(subtotal, 0);
    return {
        subtotal: amountWithOutIva,
        surcharges,
        discounts,
        taxes: +iva,
        total: +finalAmount,
        data,
    };
};

export const getMoreDatails = (payload: {
    detail: SchoolChargeDetails | AcademyChargeDetails | MiniStoreSaleDetail,
    type: InvoiceModules
}) => {
    const { type, detail } = payload
    const data = {
        claveProd: "",
        unidad: "",
        descrption: ""
    }
    switch (type) {
        case InvoiceModules.ACADEMY:
            const dAcademy = detail as AcademyChargeDetails
            data.claveProd = dAcademy.sat_code;
            data.unidad = dAcademy.unitMeasurement;
            data.descrption = dAcademy.concept ? dAcademy.concept : dAcademy.academyInscriptionConcept.description;
            break;
        case InvoiceModules.SCHOOL:
            const dSchool = detail as SchoolChargeDetails
            data.claveProd = dSchool.codeConcept;
            data.unidad = 'E48';
            data.descrption = dSchool.concept ? dSchool.concept : dSchool.schoolPlanPayment.description;
            break;
        case InvoiceModules.STORE:
            const dStore = detail as MiniStoreSaleDetail
            data.claveProd = dStore.productCode;
            data.unidad = dStore.unitMeasurement; // detail.miniStoreProduct.unity,
            data.descrption = dStore.productName ? dStore.productName : dStore.miniStoreProduct.name;
            break;
        default:
            break;
    }
    return data
}

export const ConceptsPriceByPaymentBillig = (payload: {
    payment: SchoolChargePayment | AcademyChargePayments | MiniStoreSalePayment;
    details: SchoolChargeDetails[] | AcademyChargeDetails[] | MiniStoreSaleDetail[];
    type: InvoiceModules;
    ivaDefault?: number;
    ivaByDetail?: number;
}): FacturaDetalles => {
    const { payment, details, type, ivaDefault = 1.16, ivaByDetail = .16 } = payload;
    const detalles = saleDetails(details || []);
    const pago = payment.quantity - payment.change;
    const base = (pago / detalles.total) || 1;
    const resultad = {
        total: 0,
        subtotal: 0, // sumQuantity(ivaFromFinalAmount(pago).amountWithOutIva, '0.01'),
        discount: 0,
        surcharges: 0,
        detalles: [],
    };
    const generalizedConcepts: any[] = [];
    details.forEach((detail) => {
        const totalDiscount = totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Descuentos)
        const totalRecargos = totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Recargos)
        const totalBecas = totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Becas)
        const discount = (totalAmountConcept(detail) - totalDiscount);
        const surchargesTotal = (totalAmountConcept(detail) - totalRecargos);
        const scholarshipsTotal = (totalAmountConcept(detail) - totalBecas);

        const discountTotal = mulQuantity(discount, base);
        const surcharges = mulQuantity(surchargesTotal, base);
        const scholarships = mulQuantity(scholarshipsTotal, base);

        const conceptPrice = getTotal(detail)
        resultad.discount = sumQuantity(discountTotal, resultad.discount);
        resultad.discount = sumQuantity(scholarships, resultad.discount);
        resultad.surcharges = sumQuantity(surcharges, resultad.surcharges);

        const totalMasRecargo = sumQuantity(mulQuantity(conceptPrice, base), surcharges)
        const totalNative = subQuantity(totalMasRecargo, divQuantity(discountTotal, detail.quantity));
        const nativeCalculo = ivaFromFinalAmount(totalNative, -2, ivaDefault);

        const unitPrice = sumQuantity(nativeCalculo.amountWithOutIva, divQuantity(discountTotal, detail.quantity));
        const importe = mulQuantity(unitPrice, detail.quantity);

        resultad.subtotal = sumQuantity(importe, resultad.subtotal);
        const concept = {
            id: detail.id,
            quantity: detail.quantity,
            objectoImp: detail.objetoImp || "",
            unitPrice,
            discountTotal,
            importe,
            surcharge: resultad.surcharges,
            scholarships,
            ...getMoreDatails({ detail, type })
        };
        const importeMenosDescuento = subQuantity(importe, discountTotal);
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