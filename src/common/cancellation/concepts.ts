import { InvoiceModules } from '../point-of-sale/types.pos';
import { EntityManager } from 'typeorm';
import { SchoolChargeDetails } from '../../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';
import { SchoolChargePayment } from '../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';
import { AcademyChargePayments } from '../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import { AcademyChargeDetails } from '../../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';

export const ConceptsByDetailsSale = async (payload: {
  tpv: InvoiceModules;
  type: 'payment' | 'sale';
  manager: EntityManager;
  id: number;
}): Promise<number[]> => {
  const { manager, tpv, type, id } = payload;

  let saleId = null;

  if (tpv === InvoiceModules.SCHOOL) {
    if (type == 'payment') {
      const { schoolCharge } = await manager
        .createQueryBuilder(SchoolChargePayment, 'payment')
        .leftJoinAndSelect('payment.schoolCharge', 'sale')
        .select(['payment.id', 'sale.id'])
        .where('payment.id = :paymentId', { paymentId: id })
        .getOne();

      saleId = schoolCharge.id;
    } else {
      saleId = id;
    }

    const saleDetails = await manager
      .createQueryBuilder(SchoolChargeDetails, 'details')
      .leftJoinAndSelect('details.schoolCharge', 'sale')
      .leftJoinAndSelect('details.schoolPlanPayment', 'concept')
      .select(['details.id', 'sale.id', 'concept.id'])
      .where('sale.id = :saleId', { saleId })
      .getMany();

    return saleDetails.map((details) => details.schoolPlanPayment.id);
  } else if (tpv === InvoiceModules.ACADEMY) {
    if (type == 'payment') {
      const { academyCharge } = await manager
        .createQueryBuilder(AcademyChargePayments, 'payment')
        .leftJoinAndSelect('payment.academyCharge', 'sale')
        .select(['payment.id', 'sale.id'])
        .where('payment.id = :paymentId', { paymentId: id })
        .getOne();

      saleId = academyCharge.id;
    } else {
      saleId = id;
    }

    const saleDetails = await manager
      .createQueryBuilder(AcademyChargeDetails, 'details')
      .leftJoinAndSelect('details.academyCharge', 'sale')
      .leftJoinAndSelect('details.academyInscriptionConcept', 'concept')
      .select(['details.id', 'sale.id', 'concept.id'])
      .where('sale.id = :saleId', { saleId })
      .getMany();

    return saleDetails.map((details) => details.academyInscriptionConcept.id);
  }

  return [];
};
