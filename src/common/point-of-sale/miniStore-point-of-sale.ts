import { amountAfterExtraCharge, divQuantity, mulQuantity, subQuantity, sumQuantity } from './point-of-sale';
import { divNumber, ivaFromFinalAmount } from '../numbers';
import { MiniStoreSaleDetail } from '../../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { ItemRecibo } from '../types/recibo.interface';
import { BranchOfficeSetting } from 'src/system/branch-office-setting/entities/branch-office-setting.entity';
import { FormaPago, FormaPagoType, XmlReceptorAttribute } from '@signati/core';
import { InformacionGlobal } from 'src/mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';

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

export interface FacturaDetalles {
    total: number | string;
    subtotal: number | string;
    discount: number | string;
    detalles: any[];

}

export interface Environment {
    instancePath: string
    xslt: string
}
export interface CFDIWebtel extends FacturaDetalles {
    serie: string;
    folio: string;
    codigoFormaPago: FormaPago | FormaPagoType;
    emisor: BranchOfficeSetting;
    receptor: XmlReceptorAttribute;
    env: Environment;
    informacionGlobal?: InformacionGlobal;
    importeImpuesto?: number;
}

export const  ConceptsPriceByPaymentBillig = (payment: MiniStoreSalePayment, details: MiniStoreSaleDetail[]): FacturaDetalles => {
    const detalles = saleDetails(details || []);
    const pago = payment.quantity - payment.change;
    const base = (pago / detalles.total) || 1;
    const resultad = {
        total: 0,
        subtotal: 0, // sumQuantity(ivaFromFinalAmount(pago).amountWithOutIva, '0.01'),
        discount: 0,
        detalles: [],
    };
    const generalizedConcepts: any[] = [];
    details.forEach((detail) => {
        const discount = (totalAmountConcept(detail) - totalAmountConceptAfterExCharge(detail));
        const discountTotal = mulQuantity(discount, base);
        const conceptPrice = detail.isIva ? +detail.priceWithIVA : +detail.price;

        resultad.discount = sumQuantity(discountTotal, resultad.discount);

        const nativeCalculo = ivaFromFinalAmount(subQuantity(mulQuantity(conceptPrice, base), divQuantity(discountTotal, detail.quantity)));
        // const importe = mulQuantity(sumQuantity(nativeCalculo.amountWithOutIva, discount), detail.quantity);
        // const importe = (+nativeCalculo.amountWithOutIva + (discount / detail.quantity)) * detail.quantity;
        const unitPrice = sumQuantity(nativeCalculo.amountWithOutIva, divQuantity(discountTotal, detail.quantity));
        const importe = mulQuantity(unitPrice, detail.quantity);

        resultad.subtotal = sumQuantity(importe, resultad.subtotal);
        const concept = {
            quantity: detail.quantity,
            claveProd: detail.productCode,
            unidad: detail.unitMeasurement, // detail.miniStoreProduct.unity,
            descrption: detail.productName ? detail.productName : detail.miniStoreProduct.name,
            unitPrice, // mulQuantity(conceptPrice, base),
            discountTotal,
            importe, // mulQuantity(totalAmountConcept(detail), base),
            objectoImp: detail.objetoImp
        };
        const totalconcetp = sumQuantity(subQuantity(importe, discountTotal).toString(), mulQuantity(subQuantity(importe, discountTotal), .16));
        resultad.total = sumQuantity(resultad.total, totalconcetp);
        generalizedConcepts.push(concept);
    });
    resultad.detalles = generalizedConcepts;
    return resultad;
};

/*
export const ConceptsPriceByPaymentBillig = (payment: MiniStoreSalePayment, details: MiniStoreSaleDetail[]): FacturaDetalles => {
    const saleAmount = saleDetails(details || []).total;

    const pago = payment.quantity - payment.change;
    const base = ((payment.quantity - payment.change) / saleAmount) || 1;

    const resultad = {
        total: pago,
        subtotal: 0, // sumQuantity(ivaFromFinalAmount(pago).amountWithOutIva, '0.01'),
        discount: 0,
        detalles: [],
    };
    const generalizedConcepts: any[] = [];
    details.forEach((detail) => {
        const discountTotal = (totalAmountConcept(detail) - totalAmountConceptAfterExCharge(detail));
        const discount = (discountTotal * base).toFixed(2);
        const conceptPrice = detail.isIva ? +detail.priceWithIVA : +detail.price;

        resultad.discount = sumQuantity(discount, resultad.discount);
        // @ts-ingore
        const nativeCalculo = ivaFromFinalAmount((conceptPrice * base).toFixed(2));
        const importe = mulQuantity(nativeCalculo.amountWithOutIva, detail.quantity);
        // const importe = (+nativeCalculo.amountWithOutIva + discount) * detail.quantity;

        resultad.subtotal = sumQuantity(importe, resultad.subtotal);
        const conceptos = {
            quantity: detail.quantity,
            claveProd: detail.productCode,
            unidad: 'E48', // detail.miniStoreProduct.unity,
            descrption: detail.productName ? detail.productName : detail.miniStoreProduct.name,
            unitPrice: nativeCalculo.amountWithOutIva, // mulQuantity(conceptPrice, base),
            discount,
            importe: importe, // mulQuantity(totalAmountConcept(detail), base),
        };
        generalizedConcepts.push(conceptos);
    });
    resultad.detalles = generalizedConcepts;
    return resultad;
};
*/
