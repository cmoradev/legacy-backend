import { XmlConceptoAttributes } from '@signati/core';
import { ChargesDetails } from '../point-of-sale/types.pos';
const zero = '0.00';
const zeroD = 0.00;

export interface DataInvoice{
    taxes: {
        base: string,
        amount: string
    }
    totals: {
        fiscal: Totals
        receipt: TotalsReceipt
    }
    concepts: {
        conceptsInvoice: {
            concept: XmlConceptoAttributes,
            base: string,
            import: string
        }[]
        conceptsMiniStore: ConceptReceipt[]
        conceptsSchoolAndAcademy: ConceptSchoolAndAcademy[]
    }
}


export const TotalsInit: Totals = {
    SubTotal: zero,
    Descuento: zero,
    Total: zero,
}

export const dataInvoiceInit: DataInvoice = {
    totals: {
        fiscal: TotalsInit,
        receipt: {
            ...TotalsInit,
            Recargo: zero,
            Impuesto: zero
        }
    },
    taxes: {
        amount: zero,
        base: zero
    },
    concepts: {
        conceptsInvoice: [],
        conceptsMiniStore: [],
        conceptsSchoolAndAcademy: []
    },
}

export interface Totals {
    SubTotal: string,
    Descuento: string,
    Total: string,
}

export interface TotalsReceipt extends Totals{
    Recargo: string,
    Impuesto: string,
}

export interface ConceptReceipt {
    cantidad: string,
    preciou:string,
    descripcion: string,
    recargo: string,
    descuento: string,
    importe: string,
}

export interface ConceptSchoolAndAcademy extends ConceptReceipt {
    beca: string;
}

export const initChargesDetails:  ChargesDetails = {
        base: zeroD,
        subtotal: zeroD,
        quantity: zeroD,
        total: zeroD,
        iva: zeroD,
        data: {
            becas: zeroD,
            discount: zeroD,
            recargos: zeroD
        },
        amountDiscount: zeroD,
        price: {
            amount: zeroD,
            priceUnit: zeroD
        },

    };