import { InvoiceStatus } from 'src/invoice/types/invoice-status';

export type InvoiceRow = {
  id_factura: number;
  uuid_factura: string;
  folio_factura: string;
  estado_factura: InvoiceStatus;
  global_factura: string;
  fecha_factura: string;
  id_pago: number;
};
