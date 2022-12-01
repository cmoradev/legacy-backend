import { PaymentStatus } from "./../../../common/enums/PaymentStatus";

  export const getNameStatusConcept = (id: PaymentStatus) => {
    switch (id) {
      case PaymentStatus.Debit:
        return 'Adeudo';
      case PaymentStatus.PaiOut:
        return 'Pagado';
      case PaymentStatus.Condoned:
        return 'Condonado';
      case PaymentStatus.Cancelled:
        return 'Cancelado';
      case PaymentStatus.Abonar:
        return 'Abonado';
      case PaymentStatus.quotation:
        return 'Cotizacion';
      case PaymentStatus.trusted:
        return 'Fiado';
      default:
        return '';
    }
  
  }