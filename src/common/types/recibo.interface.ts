export enum typePrint {
  ticketPrint = 1,
  receiptPrint = 2,
}

export interface Recibo {
  folio: string;
  date: Date | string | undefined;
  typeVouchers: string;
  observation: string;
  agentName: string;
  state: number;
  type: typePrint;
}

export interface TransmitterRecibo {
  rsz: string;
  rfc: string;
  location: string;
}

export interface ReceiverRecibo {
  name: string;
  matricula: string;
  curp: string | undefined;

}

export interface ItemRecibo {
  quantity: string | number;
  descrption: string;
  unitPrice: string | number | any;
  surcharge: string;
  discount: string;
  importe: string | number;
}

export interface NewReport extends ItemRecibo {
  claveProd: string
  unidad: string
  discountTotal: string,
  scholarships: string,
}

export interface DesgloseRecibo {
  subtotal: string | number;
  surcharge: string | number;
  discount: string | number;
  iva: string | number;
  total: string | number;
}

export interface WaytoPayRecibo {
  name: string;
  quantity: number | string;
  banc: string;
  account: string;
  date: any | Date | string;
}

export interface ReceiptContent {
  paymentReceipt: Recibo,
  receiver: ReceiverRecibo,
  transmiter: TransmitterRecibo,
  details: WaytoPayRecibo[],
  concepts: ItemRecibo[],
  desglose: DesgloseRecibo
}


