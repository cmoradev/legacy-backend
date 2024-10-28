export interface ISchoolReportConceptRow {
  inscriptionId: number;
  cycleId: number;
  inscriptionStatus: string;
  studentId: number;
  studentRegistration: string;
  studentName: string;
  studentStatus: string;
  groupId: number;
  groupName: string;
  gradeId: number;
  gradeName: string;
  levelId: number;
  levelName: string;
  conceptId: number;
  conceptName: string;
  conceptPaid: Date | null;
  conceptPay: Date;
  conceptQuantity: number;
  conceptPrice: string;
  conceptStatus: string;
}

export type ISchoolReportConceptDetailsRow = ISchoolReportConceptRow & {
  amountWithCharges: number;
  amountWithoutCharges: number;
  discount: number;
  surcharge: number;
};

export interface SchoolMonthDate {
  name: string;
  month: string;
  year: string;
  date: string;
}

export interface auxISchoolReportConceptRow extends ISchoolReportConceptDetailsRow {
  yearAndMonth: string;
}

export interface SchoolBase {
  id: number;
  name: string;
};

export interface SchoolGroupByMonth {
  grades: SchoolBase[];
  dataWithMonth: auxISchoolReportConceptRow[];
  dataGroupByGroup: ObjGroupBySchool;
  dataGroupByMount: ObjSchoolGroupByMount;
  dataGroupByMountAndGroup: ObjGroupByMountAndSchool;
};

export type ObjGroupByMountAndSchool = {
  [property: string]: {
    [property: string]: ISchoolReportConceptRow[]
  }
}

export type ObjSchoolGroupByMount = {
  [property: string]: ISchoolReportConceptRow[]
}

export type ObjGroupBySchool = {
  [property: string]: ISchoolReportConceptRow[]
}

export interface SchoolBankStatementRow extends SchoolGroupByMonth {
    months: SchoolMonthDate[]
}
