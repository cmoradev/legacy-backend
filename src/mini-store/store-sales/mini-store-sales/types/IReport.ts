import { PaymentStatus } from '../../../../common/enums/PaymentStatus';

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
}