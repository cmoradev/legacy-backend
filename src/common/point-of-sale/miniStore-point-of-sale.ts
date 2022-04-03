import { sumQuantity } from './point-of-sale';
import { ivaFromFinalAmount } from '../numbers';
import { NotInvoiced } from '../interface/not-invoiced.interface';
import { InvoiceDetails, Concept } from './types.pos';
export const getAmounts = (payments: NotInvoiced[], percentageTax: number = 0.16) => {
    let subtotal = 0;
    let taxes = 0;
    let total = 0;

    for (const value of payments) {
        const { finalAmount, iva, amountWithOutIva } = ivaFromFinalAmount(value.p_income, -2, sumQuantity(percentageTax, 1));

        total = sumQuantity(finalAmount, total);
        taxes = sumQuantity(iva, taxes);
        subtotal = sumQuantity(amountWithOutIva, subtotal);
    }


    return {
        subtotal,
        taxes,
        total,
    };
}
export const getDetailsPaymentsGlobal = (payments: NotInvoiced[] = [], objectImp: string, percentageTax: number = 0.16): InvoiceDetails => {
    const { total, subtotal, taxes } = getAmounts(payments, percentageTax);

    const details: Concept[] = payments.map((payment): Concept => {
        return {
            keyProdServ: '01010101',
            noIdentity: payment.p_folio,
            quantity: '1',
            keyUnit: 'ACT',
            description: `Venta ${payment.v_folio}, Pago ${payment.p_folio}`,
            unitValue: `${payment.p_income}`,
            amount: `${payment.p_income}`,
            discount: '0.00',
            objectImp
        }
    });

    return {
        total,
        taxes,
        subtotal,
        discount: 0,
        details
    };
};