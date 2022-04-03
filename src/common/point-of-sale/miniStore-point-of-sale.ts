import { divQuantity, getTotal, mulQuantity, saleDetails, subQuantity, sumQuantity, totalAmountConcept, totalAmountConceptAfterExtraCharge } from './point-of-sale';
import { ivaFromFinalAmount } from '../numbers';
import { MiniStoreSaleDetail } from '../../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { ItemRecibo } from '../types/recibo.interface';
import { NotInvoiced } from '../interface/not-invoiced.interface';
import { FacturaDetalles, InvoiceDetails, Concept } from './types.pos';
import { SystemTypeExtraChargesEnum } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { SchoolChargePayment } from '../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { AcademyChargeDetails } from '../../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { AcademyChargePayments } from '../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { SchoolChargeDetails } from '../../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
export const ConceptsPriceByPaymentBillig = (
    payload: {
        payment: SchoolChargePayment | AcademyChargePayments | MiniStoreSalePayment,
        details: SchoolChargeDetails[] | AcademyChargeDetails[] | MiniStoreSaleDetail[],
        ivaDefault?: number
    }): FacturaDetalles => {
    const { payment, details, ivaDefault = 1.16 } = payload;
    const detalles = saleDetails(details || []);
    const pago = payment.quantity - payment.change;
    const base = (pago / detalles.total) || 1;
    const resultad = {
        total: 0,
        subtotal: 0, // sumQuantity(ivaFromFinalAmount(pago).amountWithOutIva, '0.01'),
        discount: 0,
        surcharges: 0,
        detalles: [],
    };
    const generalizedConcepts: any[] = [];
    details.forEach((detail) => {
        const totalDiscount = totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Descuentos)
        const totalRecargos = totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Recargos)
        const totalBecas = totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Becas)
        const discount = (totalAmountConcept(detail) - totalDiscount);
        const surchargesTotal = (totalAmountConcept(detail) - totalRecargos);
        const scholarshipsTotal = (totalAmountConcept(detail) - totalBecas);

        const discountTotal = mulQuantity(discount, base);
        const surcharges = mulQuantity(surchargesTotal, base);
        const scholarships = mulQuantity(scholarshipsTotal, base);

        const conceptPrice = getTotal(detail)
        resultad.discount = sumQuantity(discountTotal, resultad.discount);
        resultad.discount = sumQuantity(scholarships, resultad.discount);
        resultad.surcharges = sumQuantity(surcharges, resultad.surcharges);

        const totalMasRecargo = sumQuantity(mulQuantity(conceptPrice, base), surcharges)
        const totalNative = subQuantity(totalMasRecargo, divQuantity(discountTotal, detail.quantity));
        const nativeCalculo = ivaFromFinalAmount(totalNative, -2, ivaDefault);

        const unitPrice = sumQuantity(nativeCalculo.amountWithOutIva, divQuantity(discountTotal, detail.quantity));
        const importe = mulQuantity(unitPrice, detail.quantity);

        resultad.subtotal = sumQuantity(importe, resultad.subtotal);
        const concept = {
            id: detail.id,
            quantity: detail.quantity,
            objectoImp: detail.objetoImp,
            unitPrice, // mulQuantity(conceptPrice, base),
            discountTotal,
            importe, // mulQuantity(totalAmountConcept(detail), base),
            surcharge: resultad.surcharges,
            scholarships,

            claveProd: detail.productCode,
            unidad: detail.unitMeasurement, // detail.miniStoreProduct.unity,
            descrption: detail.productName ? detail.productName : detail.miniStoreProduct.name,


        };
        const importeMenosDescuento = subQuantity(importe, discountTotal);
        const totalconcetp = sumQuantity(importeMenosDescuento, mulQuantity(importeMenosDescuento, .16));
        resultad.total = sumQuantity(resultad.total, totalconcetp);
        generalizedConcepts.push(concept);
    });
    resultad.detalles = generalizedConcepts;
    return resultad;
};
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