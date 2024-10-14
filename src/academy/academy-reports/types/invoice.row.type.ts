export type InvoiceRow = {
  id_factura: number;
  uuid_factura: string;
  folio_factura: string;
  razon_social_factura: string;
  global_factura: string;
  total_factura: number;
  id_pago: number;
};

export type InvoiceDetailsRow = InvoiceRow & {};
