import { SchoolChargesMethodsPayments } from '../../school-charges-methods-payments/entities/school-charges-methods-payments.entity';

export const getHighestPayment = (
  formadepago: SchoolChargesMethodsPayments[],
) => {
  const methodpaymenst = formadepago.sort((a, b) => {
    return a.quantity - b.quantity;
  });

  return methodpaymenst[0];
};
