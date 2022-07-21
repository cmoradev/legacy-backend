import { Detalles, InvoiceModules, Payment } from '../point-of-sale/types.pos';

export type BuildDataInvoiceParams<T extends Detalles = any> = {
    payment: Payment,
    details: T[]
    type: InvoiceModules;
}

export const buildDataInvoice = (params: BuildDataInvoiceParams) => {
    console.log('Params');

    console.log(JSON.stringify(params, null, 3))

    return {}
}
