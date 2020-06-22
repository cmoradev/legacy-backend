import { amountAfterExtraCharge, mulQuantity } from './point-of-sale';
import { ivaFromFinalAmount } from '../numbers';
import { MiniStoreSaleDetail } from '../../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { ItemRecibo } from '../types/recibo.interface';

export const totalAmountConceptAfterExCharge = (detail: MiniStoreSaleDetail) => {
    const conceptPrice = detail.isIva ? +detail.priceWithIVA : +detail.price;
    const total = mulQuantity(conceptPrice, detail.quantity);

    return amountAfterExtraCharge(total, detail.extraCharges.map(value => {
        return { quantity: value.quantity, type: value.applicationType };
    }));
};

export const totalAmountConcept = (detail: MiniStoreSaleDetail) => {
    const conceptPrice = detail.isIva ? +detail.priceWithIVA : +detail.price;
    return mulQuantity(conceptPrice, detail.quantity);
};

export const saleDetails = (details: MiniStoreSaleDetail[]) => {
    let subtotal = 0;
    let discounts = 0;
    const taxes = 0;
    const total = 0;
    const surcharges = 0;
    details.forEach((detail) => {
        subtotal += totalAmountConcept(detail);
        discounts += totalAmountConceptAfterExCharge(detail);
    });
    discounts = subtotal - discounts;
    const { finalAmount, iva, amountWithOutIva } = ivaFromFinalAmount((subtotal - discounts));
    return {
        subtotal: amountWithOutIva,
        surcharges,
        discounts,
        taxes: +iva,
        total: +finalAmount,
    };
};

export const generalizeConceptsPriceByPayment = (payment: MiniStoreSalePayment, details: MiniStoreSaleDetail[]): ItemRecibo[] => {
    const saleAmount = saleDetails(details || []).total;
    const base = ((payment.quantity - payment.change) / saleAmount) || 1;
    const generalizedConcepts: ItemRecibo[] = [];
    details.forEach((detail) => {
        const discount = (totalAmountConcept(detail) - totalAmountConceptAfterExCharge(detail));

        const conceptPrice = detail.isIva ? +detail.priceWithIVA : +detail.price;

        generalizedConcepts.push({
            descrption: detail.productName,
            discount: (discount * base).toFixed(2),
            importe: (totalAmountConcept(detail) * base),
            quantity: detail.quantity,
            surcharge: '0.00',
            unitPrice: conceptPrice * base,
        });
    });
    return generalizedConcepts;
};

export const ConceptsPriceByPaymentBillig = (payment: MiniStoreSalePayment, details: MiniStoreSaleDetail[]) => {
    const saleAmount = saleDetails(details || []).total;
    const base = ((payment.quantity - payment.change) / saleAmount) || 1;
    const generalizedConcepts: any[] = [];
    details.forEach((detail) => {
        const discount = (totalAmountConcept(detail) - totalAmountConceptAfterExCharge(detail));

        const conceptPrice = detail.isIva ? +detail.priceWithIVA : +detail.price;

        generalizedConcepts.push({
            descrption: detail.productName ? detail.productName : detail.miniStoreProduct.name,
            discount: (discount * base).toFixed(2),
            importe: (totalAmountConcept(detail) * base),
            quantity: detail.quantity,
            unitPrice: conceptPrice * base,
        });
    });
    return generalizedConcepts;
};