import { amountAfterExtraCharge, mulQuantity } from './point-of-sale';
import { ivaFromFinalAmount } from '../numbers';
import { MiniStoreSaleDetail } from '../../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { ItemRecibo } from '../types/recibo.interface';

export const totalAmountConceptAfterExCharge = (concept: MiniStoreSaleDetail) => {
    const conceptPrice = concept.miniStoreProduct.IVA ? +concept.priceWithIVA : +concept.price;
    const total = mulQuantity(conceptPrice, concept.quantity);

    return amountAfterExtraCharge(total, concept.extraCharges.map(value => {
        return {quantity: value.quantity, type: value.applicationType};
    }));
};

export const totalAmountConcept = (concept: MiniStoreSaleDetail) => {
    const conceptPrice = concept.miniStoreProduct.IVA  ? +concept.priceWithIVA : +concept.price;
    return mulQuantity(conceptPrice, concept.quantity);
};

export const saleDetails = (details: MiniStoreSaleDetail[]) => {
    let subtotal = 0;
    let discounts = 0;
    const taxes = 0;
    const total = 0;
    const surcharges = 0;
    details.forEach((concept) => {
        subtotal += totalAmountConcept(concept);
        discounts += totalAmountConceptAfterExCharge(concept);
    });
    discounts = subtotal - discounts;
    const {finalAmount, iva, amountWithOutIva} = ivaFromFinalAmount((subtotal - discounts));
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
    details.forEach((concept) => {
        const discount = (totalAmountConcept(concept) - totalAmountConceptAfterExCharge(concept));

        const conceptPrice = concept.miniStoreProduct.IVA  ? +concept.priceWithIVA : +concept.price;

        generalizedConcepts.push({
            descrption: concept.productName,
            discount: (discount * base).toFixed(2),
            importe: (totalAmountConcept(concept) * base),
            quantity: concept.quantity,
            surcharge: '0.00',
            unitPrice: conceptPrice * base,
        });
    });
    return generalizedConcepts;
};
