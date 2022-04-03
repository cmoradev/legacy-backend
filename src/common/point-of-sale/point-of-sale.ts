import { add, div, mul, round, sub } from 'exact-math';
import { AcademyChargeDetails } from '../../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { MiniStoreSaleDetail } from '../../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { SchoolChargeDetails } from '../../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
import { SystemTypeExtraChargesEnum } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { TypeChargeApplicationEnum } from '../../system/system-extra-charges/enums/system-extra-charges.enum';
import { TypeDetails } from './types.pos';
import { ivaFromFinalAmount } from '../numbers';

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

// export const saleDetails = (details: MiniStoreSaleDetail[]) => {
//     let subtotal = 0, surcharges = 0, discounts = 0, scholarships = 0;
//     details.forEach((detail) => {
//         subtotal += totalAmountConcept(detail);
//         discounts += totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Descuentos);
//         surcharges += totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Recargos);
//         scholarships += totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Becas);
//     });
//     discounts = sub(subtotal, discounts);
//     scholarships = sub(subtotal, scholarships);
//     discounts = add(scholarships, discounts);
//     surcharges = sub(subtotal, surcharges);
//     subtotal = sub(add(subtotal, surcharges), discounts);
//     const data = {
//         discounts,
//         scholarships,
//         surcharges,
//         subtotal,
//     };
//     const { finalAmount, iva, amountWithOutIva } = ivaFromFinalAmount((subtotal - discounts));
//     return {
//         subtotal: amountWithOutIva,
//         surcharges,
//         discounts,
//         taxes: +iva,
//         total: +finalAmount,
//         data,
//     };
// };