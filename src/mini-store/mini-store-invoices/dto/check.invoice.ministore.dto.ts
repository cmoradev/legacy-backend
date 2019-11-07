export class CheckInvoiceMinistoreDto {
  readonly idInvoice: number;
  readonly idSalePayment: number;
  readonly uuid: string;
  // readonly emisorRFC: string;
  readonly receptorRFC: string;
  readonly total: string;
}
