export interface IReportConceptRow {
  inscriptionId: number;
  cycleId: number;
  studentId: number;
  studentRegistration: string;
  studentName: string;
  levelId: number;
  levelName: string;
  gradeId: number;
  gradeName: string;
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