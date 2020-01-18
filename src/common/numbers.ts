import { add, div, mul, round, sub } from 'exact-math';

interface IvaFromFinalAmount {
  finalAmount: string;
  amountWithOutIva: string;
  iva: string;
}

interface IvaAndFinalAmount {
  originalAmount: string;
  amountWithIva: string;
  iva: string;
}

interface Onliva {
  originalAmount: string;
  iva: string;
}

export function ivaFromFinalAmount(amount: number, ivaDefault: number = 1.16): IvaFromFinalAmount {
  if (amount > 0) {
    const finalAmount = round(amount, -2, {
      returnString: true,
      trim: false,
    });
    const amountWithOutIva = round(div(amount, ivaDefault, { returnString: true }), -2, {
      returnString: true,
      trim: false,
    });
    const iva = round(sub(finalAmount, amountWithOutIva, { returnString: true }), -2, {
      returnString: true,
      trim: false,
    });
    return { finalAmount, amountWithOutIva, iva };
  }
  return { finalAmount: '0.00', amountWithOutIva: '0.00', iva: '0.00' };
}

export function ivaAndFinalAmount(amount: number, ivaDefault: number = 1.16): IvaAndFinalAmount {
  if (amount > 0) {
    const originalAmount = round(amount, -2, {
      returnString: true,
      trim: false,
    });
    const amountWithIva = round(mul(amount, ivaDefault, { returnString: true }), -2, {
      returnString: false,
      trim: false,
    });
    const iva = round(sub(amountWithIva, originalAmount, { returnString: true }), -2, {
      returnString: true,
      trim: false,
    });
    return { originalAmount, amountWithIva, iva };
  }
  return { originalAmount: '0.00', amountWithIva: '0.00', iva: '0.00' };

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
