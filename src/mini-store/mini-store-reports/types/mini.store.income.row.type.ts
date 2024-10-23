export type MiniStoreIncomeRow = {
  id_venta: number;
  folio_venta: string;
  fecha_venta: string;
  id_alumno: number;
  matricula_alumno: string;
  nombre_alumno: string;
  id_agente: number;
  nombre_agente: string;
  id_pago: number;
  folio_pago: string;
  fecha_pago: string;
  uuid_factura: string;
  total_cobrado: number;
  cobrado: number;
  id_metodo_pago: number;
  metodo_pago: string;
};

export type MiniStoreIncomeDetailsRow = MiniStoreIncomeRow & {
  folio_factura: string;
  fecha_factura: string;
  tipo_factura: string;
};
