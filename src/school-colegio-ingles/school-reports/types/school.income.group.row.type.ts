export type SchoolIncomeGroupRow = {
  id_venta: number;
  folio_venta: string;
  fecha_venta: string;
  id_pago: number;
  folio_pago: string;
  fecha_pago: string;
  id_alumno: number;
  matricula_alumno: string;
  nombre_alumno: string;
  id_nivel: number;
  nivel: string;
  id_grado: number;
  grado: string;
  id_grupo: number;
  grupo: string;
  id_concepto: number;
  concepto: string;
  cobrado: number;
  precio: number
};

export type SchoolIncomeDetailsGroupRow = SchoolIncomeGroupRow & {
  amountWithCharges: number;
  amountWithoutCharges: number;
  discount: number;
  surcharge: number;
};
