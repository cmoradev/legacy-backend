import { add, div, mul, round, sub } from 'exact-math';

interface IvaFromFinalAmount {
    finalAmount: string | number;
    amountWithOutIva: string | number;
    iva: string | number;
}

interface IvaAndFinalAmount {
    originalAmount: string | number;
    amountWithIva: string | number;
    iva: string | number;
}

interface Onliva {
    originalAmount: string;
    iva: string;
}

export function ivaFromFinalAmount(amount: number | string, decimal: number = -2, ivaDefault: number = 1.16): IvaFromFinalAmount {
    if (amount > 0) {
        const finalAmount = amount;
        let amountWithOutIva = 0;
        let iva = 0;
        if (ivaDefault === 0) {
            amountWithOutIva = round(mul(amount, 1, { returnString: true }), decimal, {
                returnString: true,
                trim: false,
            });
        } else {
            amountWithOutIva = round(div(amount, ivaDefault, { returnString: true }), decimal, {
                returnString: true,
                trim: false,
            });
            iva = round(sub(finalAmount, amountWithOutIva, { returnString: true }), decimal, {
                returnString: true,
                trim: false,
            });
        }
        return { finalAmount, amountWithOutIva, iva };
    } else {
        console.log('verifica la funcion ivaFromFinalAmount', amount);
    }
    return { finalAmount: 0.000000, amountWithOutIva: 0.000000, iva: 0.00 };
}

export function ivaAndFinalAmount(amount: number, ivaDefault: number = 1.16): IvaAndFinalAmount {
    if (amount > 0) {
        const originalAmount = amount;
        const amountWithIva = round(mul(amount, ivaDefault, { returnString: true }), -2, {
            returnString: true,
            trim: false,
        });
        const iva = round(sub(amountWithIva, originalAmount, { returnString: true }), -2, {
            returnString: true,
            trim: false,
        });
        return { originalAmount, amountWithIva, iva };
    }
    return { originalAmount: 0.000000, amountWithIva: 0.000000, iva: 0.00 };
}

export function calculateOnlyIva(amount: number, ivaIn: number = 0.16): Onliva {
    if (amount > 0) {
        const originalAmount = round(amount, -2, {
            returnString: true,
            trim: false,
        });
        const iva = round(mul(amount, ivaIn), -2, {
            returnString: true,
            trim: false,
        });
        return { originalAmount, iva };
    }
    return { originalAmount: '0.000000', iva: '0.00' };
}

export function divNumber(dividiendo: string | number, divisor: string | number) {
    return round(div(dividiendo, divisor, { returnString: true }), -2, {
        returnString: true,
        trim: false,
    });
}

export function MultNumber(num: string | number, num2: string | number) {
    return round(mul(num, num2, { returnString: true }), -2, {
        returnString: true,
        trim: false,
    });
}
