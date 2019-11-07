export class CancelInvoiceMinistoreDto {
  readonly idInvoice: number;
  readonly uuid: string;
  readonly idSalePayment: number;
  readonly idAgentCanceling: number;
  readonly reasonCancellation: string;
}