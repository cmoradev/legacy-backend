import { PaymentStatus } from '../../../common/enums/PaymentStatus';

export interface IQueryReportConcept {
  conceptStatus: PaymentStatus;
  conceptPay: string | Date;
  cycleId: number | string;
  branchOfficeId: number | string;
  isExported: boolean;
}

export interface IQueryReport {
  statusPayment: PaymentStatus,
  month: string | Date,
  cycleId: number | string;
  branchOfficeId: number | string;
  levelId: number | string;
  gradeId: number | string;
  isExported: boolean
}

export interface ReportStructure {
  enrollment: string,
  clientName: string,
  clientType: string
  level: string,
  grade: string,
  group: string;
  description: string,
  payDay: Date | string,
  price: string | number,
  statusPayment: string,
}