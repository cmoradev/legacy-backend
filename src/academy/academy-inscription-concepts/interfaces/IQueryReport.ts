import { PaymentStatus } from '../../../common/enums/PaymentStatus';

export interface IAcademyQueryReport {
  statusPayment: PaymentStatus,
  month: string | Date,
  cycleId: number | string;
  branchOfficeId: number | string;
  academyId: number | string;
  groupId: number | string;
  isExported: boolean
}

export interface IAcademyQueryReportConcept {
  conceptStatus: PaymentStatus;
  conceptPay: string | Date;
  cycleId: number | string;
  branchOfficeId: number | string;
  isExported: boolean;
  academyId: number | string;
}

export interface IAcademyReportConceptRow {
  inscriptionId: number;
  cycleId: number;
  inscriptionStatus: string;
  studentId: number;
  studentRegistration: string;
  studentName: string;
  studentStatus: string;
  academyId: number;
  academyName: string;
  groupId: number;
  groupName: string;
  conceptId: number;
  conceptName: string;
  conceptPaid: Date | null;
  conceptPay: Date;
  conceptQuantity: number;
  conceptPrice: string;
  conceptStatus: string;
}

export interface AcademyReportStructure {
  enrollment: string,
  clientName: string,
  clientType: string
  academy: string,
  group: string;
  description: string,
  payDay: Date | string,
  price: string | number,
  statusPayment: string,
}