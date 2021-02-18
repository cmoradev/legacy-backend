import { SchoolChargeDetails } from '../../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
import { AcademyChargeDetails } from '../../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { amountAfterExtraCharge, divQuantity, mulQuantity, subQuantity, sumQuantity } from './point-of-sale';
import { SystemTypeExtraChargesEnum } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { add, sub } from 'exact-math';
import { ivaFromFinalAmount } from '../numbers';
import { SchoolChargePayment } from '../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { AcademyChargePayments } from '../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { MiniStoreSaleDetail } from '../../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { FacturaDetalles, saleDetails, totalAmountConceptAfterExCharge } from './miniStore-point-of-sale';
import { AcademyCharge } from '../../academy/charges-academy/academy-charge/entities/academy-charge.entity';

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


export const ConceptsPriceByPaymentBilligAS = (payment: SchoolChargePayment | AcademyChargePayments, details: SchoolChargeDetails[] | AcademyChargeDetails[]): FacturaDetalles => {
  const detalles = saleDetailsAcademySchool(details || []);
  const pago = payment.quantity - payment.change;
  const base = (pago / detalles.total) || 1;
  console.log(ivaFromFinalAmount(pago));
  const resultad = {
    total: 0,
    subtotal: 0, // sumQuantity(ivaFromFinalAmount(pago).amountWithOutIva, '0.01'),
    discount: 0,
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

    const nativeCalculo = ivaFromFinalAmount(subQuantity(sumQuantity(mulQuantity(conceptPrice, base), surcharges), divQuantity(discountTotal, detail.quantity)));
    console.log('Nativo', nativeCalculo);

    const unitPrice = sumQuantity(nativeCalculo.amountWithOutIva, divQuantity(discountTotal, detail.quantity));
    const importe = mulQuantity(unitPrice, detail.quantity);

    resultad.subtotal = sumQuantity(importe, resultad.subtotal);
    const concept = {
      quantity: detail.quantity,
      claveProd: detail.codeConcept,
      unidad: 'E48', // detail.miniStoreProduct.unity,
      descrption: detail.concept ? detail.concept : detail.academyInscriptionConcept.description,
      unitPrice, // mulQuantity(conceptPrice, base),
      discountTotal,
      importe, // mulQuantity(totalAmountConcept(detail), base),
    };
    const totalconcetp = sumQuantity(subQuantity(importe, discountTotal).toString(), mulQuantity(subQuantity(importe, discountTotal), .16));
    resultad.total = sumQuantity(resultad.total, totalconcetp);
    generalizedConcepts.push(concept);
  });
  resultad.detalles = generalizedConcepts;
  console.log('total: ' + resultad.total);
  return resultad;
};
