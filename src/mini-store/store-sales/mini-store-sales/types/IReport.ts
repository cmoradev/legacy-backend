import { TypeInformativeReport } from '../../../../common/enums/typeInformativeReport.enum';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';

export interface IQueryReportSaleTodayOp extends IQueryReportSaleToday{
  byClient?: boolean;
}

export interface IQueryReportSaleToday {
  status?: PaymentStatus;
  startDate: string;
  endDate: string;
  cycleId?: number;
  branchOfficeId?: number;
  isExported: boolean;
}

export interface IReportSaleTodayRow {
  id: number;
  folio: string;
  createdAt: Date;
  id_estado_pago: PaymentStatus,
  observaciones: string;
  studentId: number;
  studentRegistration: string;
  studentName: string;
  agentId: number;
  AgentName: string;
  branchOfficeId: number;
  plantel: string;
  cycleId: number;
  ciclo: string;
  cantidadPagos: number;
  idsPagos: number[];
  TotalPagos: number;
  TotalDetalles: number;
  idsDetalles: number[];
  TotalAdeudo: string;
  countSale?: number
}

export interface IReportInformativeRow {
  v_createdAt: Date;
  vd_id_venta_detalle: number;
  v_id_venta: number;
  v_folio_venta: string;
  p_id_product: number;
  p_name_product: string;
  c_id: number;
  c_name_classification: string;
  u_id_agent: number;
  u_fullname_agent: string;
  vd_quantity: number;
  vd_price: number;
  ids_ventas_pagos: number;
  folios_ventas_pagos: string;
  subtotal: number;
}

export interface IQueryReportInformative extends IQueryReportSaleToday {
  type: TypeInformativeReport
}