import { amountAfterExtraCharge, divQuantity, mulQuantity, subQuantity, sumQuantity } from './point-of-sale';
import { divNumber, ivaFromFinalAmount } from '../numbers';
import { MiniStoreSaleDetail } from '../../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { ItemRecibo } from '../types/recibo.interface';
import { BranchOfficeSetting } from 'src/system/branch-office-setting/entities/branch-office-setting.entity';
import { FormaPago, FormaPagoType, XmlReceptorAttribute } from '@signati/core';
import { InformacionGlobal } from 'src/mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { NotInvoiced } from '../interface/not-invoiced.interface';

export const totalAmountConceptAfterExCharge = (detail: MiniStoreSaleDetail) => {
    const total = totalAmountConcept(detail);
    const {extraCharges = []} = detail;
    return amountAfterExtraCharge(total, extraCharges.map(value => {
        return {quantity: value.quantity, type: value.applicationType};
    }));
};

export const totalAmountConcept = (detail: MiniStoreSaleDetail) => {
    const conceptPrice = detail.isIva ? +detail.priceWithIVA : +detail.price;
    return mulQuantity(conceptPrice, detail.quantity);
};

export const saleDetails = (details: MiniStoreSaleDetail[]) => {
    let subtotal = 0;
    let discounts = 0;
    const surcharges = 0;
    details.forEach((detail) => {
        subtotal += totalAmountConcept(detail);
        discounts += totalAmountConceptAfterExCharge(detail);
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
    taxes?: number | string;
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

export const ConceptsPriceByPaymentBillig = (payment: MiniStoreSalePayment, details: MiniStoreSaleDetail[]): FacturaDetalles => {
    const pago = payment.quantity - payment.change;
    const detalles = saleDetails(details || []);
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
        const unitPrice = sumQuantity(nativeCalculo.amountWithOutIva, divQuantity(discountTotal, detail.quantity));
        const importe = mulQuantity(unitPrice, detail.quantity);

        resultad.subtotal = sumQuantity(importe, resultad.subtotal);
        const concept = {
            id: detail.id,
            quantity: detail.quantity,
            claveProd: detail.productCode,
            unidad: detail.unitMeasurement, // detail.miniStoreProduct.unity,
            objectoImp: detail.objetoImp,
            descrption: detail.productName ? detail.productName : detail.miniStoreProduct.name,
            unitPrice, // mulQuantity(conceptPrice, base),
            discountTotal,
            importe, // mulQuantity(totalAmountConcept(detail), base),
        };
        const totalconcetp = sumQuantity(subQuantity(importe, discountTotal).toString(), mulQuantity(subQuantity(importe, discountTotal), .16));
        resultad.total = sumQuantity(resultad.total, totalconcetp);
        generalizedConcepts.push(concept);
    });
    resultad.detalles = generalizedConcepts;
    return resultad;
};

export interface Concept {
    keyProdServ: string;
    noIdentity: string;
    quantity: string;
    keyUnit: string;
    description: string;
    unitValue: string;
    amount: string;
    discount: string;
    objectImp: string;
}

export interface InvoiceDetails {
    total: number;
    subtotal: number;
    discount: number;
    taxes: number;
    details: Concept[];
}

export const getAmounts = (payments: NotInvoiced[]) => {
    let subtotal = 0;
    let taxes = 0;
    let total = 0;

    for (const value of payments) {
        const {finalAmount, iva, amountWithOutIva} = ivaFromFinalAmount(value.p_income);

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

export const getDetailsPaymentsGlobal = (payments: NotInvoiced[] = [], objectImp: string): InvoiceDetails => {
    const {total, subtotal, taxes} = getAmounts(payments);

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
