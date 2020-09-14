import { add, div, mul, round, sub } from 'exact-math';
import { TypeChargeApplicationEnum } from '../../system/system-extra-charges/enums/system-extra-charges.enum';

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
