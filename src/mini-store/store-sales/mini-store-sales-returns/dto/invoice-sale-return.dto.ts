export class InvoiceSaleReturnDto {
    readonly idSaleReturn: number;
    readonly receptor: string;
    readonly receptorRfc: string;
    readonly email: string;
    readonly usoCfdi: string;
    readonly uuidRelation: string[];
    readonly idUser: number;
  }