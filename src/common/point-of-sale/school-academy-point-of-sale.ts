import { SchoolChargeDetails } from '../../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
import { AcademyChargeDetails } from '../../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { amountAfterExtraCharge, mulQuantity } from './point-of-sale';
import { SystemTypeExtraChargesEnum } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { add, sub } from 'exact-math';
import { ivaFromFinalAmount } from '../numbers';
import { SchoolChargePayment } from '../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { AcademyChargePayments } from '../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';

export const totalAmountConceptAfterExtraCharge = (concept: SchoolChargeDetails | AcademyChargeDetails, typeExtraCharges: SystemTypeExtraChargesEnum) => {
    const conceptPrice = concept.price;
    const total = mulQuantity(conceptPrice, concept.quantity);

    // @ts-ignore
    return amountAfterExtraCharge(total, concept.extraCharges.map((value) => {

        return value.typeExtraCharge === typeExtraCharges ?
            {
                quantity: value.quantity,
                type: value.applicationType,
            } : {
                quantity: 0,
                type: value.applicationType,
            };
    }));
};

export const totalAmountConcept = (concept: SchoolChargeDetails | AcademyChargeDetails) => {
    const conceptPrice = +concept.price;
    return mulQuantity(conceptPrice, concept.quantity);
};

export const saleDetailsAcademySchool = (details: SchoolChargeDetails[] | AcademyChargeDetails[]) => {

    // tslint:disable-next-line:one-variable-per-declaration
    let subtotal = 0, surcharges = 0, discounts = 0, scholarships = 0;
    details.forEach((concept: SchoolChargeDetails | AcademyChargeDetails) => {
        subtotal += totalAmountConcept(concept);
        discounts += totalAmountConceptAfterExtraCharge(concept, SystemTypeExtraChargesEnum.Descuentos);
        surcharges += totalAmountConceptAfterExtraCharge(concept, SystemTypeExtraChargesEnum.Recargos);
        scholarships += totalAmountConceptAfterExtraCharge(concept, SystemTypeExtraChargesEnum.Becas);
    });

    discounts = sub(subtotal, discounts);
    scholarships = sub(subtotal, scholarships);
    discounts = add(scholarships, discounts);
    surcharges = sub(subtotal, surcharges);
    subtotal = sub(add(subtotal, surcharges), discounts);
    const data = {
        discounts,
        scholarships,
        surcharges,
        subtotal,
    };
    const { finalAmount, iva, amountWithOutIva } = ivaFromFinalAmount(subtotal, 0);
    return {
        subtotal: amountWithOutIva,
        surcharges,
        discounts,
        taxes: +iva,
        total: +finalAmount,
        data,
    };
};
//  ItemRecibo[]
export const generalizeConceptsPriceByPaymentAcSc = (payment: SchoolChargePayment | AcademyChargePayments, details: SchoolChargeDetails[] | AcademyChargeDetails[]) => {
    const saleAmount = saleDetailsAcademySchool(details || []).total;
    const base = ((payment.quantity - payment.change) / saleAmount) || 1;
    const generalizedConcepts: any[] = []; // ItemRecibo[]
    details.forEach((detail: SchoolChargeDetails | AcademyChargeDetails) => {
        const discount = (totalAmountConcept(detail) - totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Descuentos));
        const surcharges = (totalAmountConcept(detail) - totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Recargos));
        const scholarships = (totalAmountConcept(detail) - totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Becas));

        // const conceptPrice = detail.isIva ? +detail.priceWithIVA : +detail.price;
        const conceptPrice = detail.price;
        generalizedConcepts.push({
            id: detail.id,
            descrption: detail.concept,
            discount: ((discount + scholarships) * base).toFixed(2),
            importe: (totalAmountConcept(detail) * base),
            quantity: detail.quantity,
            surcharge: surcharges,
            unitPrice: mulQuantity(conceptPrice, base),
        });
    });
    return generalizedConcepts;
};
