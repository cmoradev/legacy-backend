export type MiniStoreInvoiceRow = {
  id_factura: number;
  uuid_factura: string;
  folio_factura: string;
  fecha_factura: string;
  razon_social_cliente: string;
  rfc_cliente: string;
  global_factura: string;
  total_factura: number;
  id_pago: number;
};

export type MiniStoreInvoiceIncomeRow = {
  id_venta: number;
  folio_venta: string;
  fecha_venta: string;
  id_pago: number;
  folio_pago: string;
  fecha_pago: string;
  uuid_factura: string;
  cobrado: number;
  id_metodo_pago: number;
  metodo_pago: string;
  codigo_metodo_pago: string;
};

export type MiniStoreInvoiceDetailsRow = MiniStoreInvoiceRow & {
  codigo_metodo_pago: string;
  nombre_metodo_pago: string;
};
