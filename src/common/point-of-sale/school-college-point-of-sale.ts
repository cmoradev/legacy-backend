import { SchoolChargeDetails } from '../../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
import { AcademyChargeDetails } from '../../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { divQuantity, mulQuantity, saleDetails, subQuantity, sumQuantity, totalAmountConcept, totalAmountConceptAfterExtraCharge } from './point-of-sale';
import { SystemTypeExtraChargesEnum } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { ivaFromFinalAmount } from '../numbers';
import { SchoolChargePayment } from '../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { AcademyChargePayments } from '../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
//  ItemRecibo[]
export const ConceptsPriceByPaymentBilligAS = (payment: SchoolChargePayment | AcademyChargePayments, details: SchoolChargeDetails[] | AcademyChargeDetails[]): any => {
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
    const discount = (totalAmountConcept(detail) - totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Descuentos));
    const surchargesTotal = (totalAmountConcept(detail) - totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Recargos));
    const scholarshipsTotal = (totalAmountConcept(detail) - totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Becas));

    const discountTotal = mulQuantity(discount, base);
    const surcharges = mulQuantity(surchargesTotal, base);
    const scholarships = mulQuantity(scholarshipsTotal, base);

    const conceptPrice = detail.price;
    resultad.discount = sumQuantity(discountTotal, resultad.discount);
    resultad.discount = sumQuantity(scholarships, resultad.discount);
    resultad.surcharges = sumQuantity(surcharges, resultad.surcharges);

    const nativeCalculo = ivaFromFinalAmount(subQuantity(sumQuantity(mulQuantity(conceptPrice, base), surcharges), divQuantity(discountTotal, detail.quantity)), -2, 1);


    const unitPrice = sumQuantity(nativeCalculo.amountWithOutIva, divQuantity(discountTotal, detail.quantity));
    const importe = mulQuantity(unitPrice, detail.quantity);

    resultad.subtotal = sumQuantity(importe, resultad.subtotal);
    const concept = {
      id: detail.id,
      quantity: detail.quantity,
      claveProd: detail.codeConcept,
      unidad: 'E48',
      descrption: detail.concept ? detail.concept : detail.academyInscriptionConcept.description,
      unitPrice,
      discountTotal,
      surcharge: resultad.surcharges,
      scholarships,
      importe,
    };
    const totalconcetp = sumQuantity(subQuantity(importe, discountTotal).toString(), mulQuantity(subQuantity(importe, discountTotal), 0));
    resultad.total = sumQuantity(resultad.total, totalconcetp);
    generalizedConcepts.push(concept);
  });
  resultad.detalles = generalizedConcepts;
  resultad.total = subQuantity(resultad.subtotal, resultad.discount);

  return resultad;
};
