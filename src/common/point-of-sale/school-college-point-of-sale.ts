import { SchoolChargeDetails } from '../../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
import { AcademyChargeDetails } from '../../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { divQuantity, getTotal, mulQuantity, saleDetails, subQuantity, sumQuantity, totalAmountConcept, totalAmountConceptAfterExtraCharge } from './point-of-sale';
import { SystemTypeExtraChargesEnum } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { ivaFromFinalAmount } from '../numbers';
import { SchoolChargePayment } from '../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { AcademyChargePayments } from '../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { MiniStoreSaleDetail } from '../../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
//  ItemRecibo[]
export const ConceptsPriceByPaymentBilligAS = (payload: {
  payment: SchoolChargePayment | AcademyChargePayments | MiniStoreSalePayment,
  details: SchoolChargeDetails[] | AcademyChargeDetails[] | MiniStoreSaleDetail[],
  ivaDefault: number
}): any => {
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
      // objectoImp: detail.objetoImp,
      unitPrice,
      discountTotal,
      importe,
      surcharge: resultad.surcharges,
      scholarships,

      claveProd: detail.codeConcept,
      unidad: 'E48',
      descrption: detail.concept ? detail.concept : detail.academyInscriptionConcept.description,


    };
    const importeMenosDescuento = subQuantity(importe, discountTotal);
    const totalconcetp = sumQuantity(importeMenosDescuento, mulQuantity(importeMenosDescuento, 0));
    resultad.total = sumQuantity(resultad.total, totalconcetp);
    generalizedConcepts.push(concept);
  });
  resultad.detalles = generalizedConcepts;
  resultad.total = subQuantity(resultad.subtotal, resultad.discount);

  return resultad;
};
