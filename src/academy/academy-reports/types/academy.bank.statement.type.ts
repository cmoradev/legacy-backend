import { IAcademyReportConceptDetailsRow } from '../../../academy/academy-inscription-concepts/interfaces/IQueryReport';

export type auxIAcademyReportConceptRow = {
  yearAndMonth: string;
} & IAcademyReportConceptDetailsRow;

export type baseAcademyBankStatement = {
  id: number;
  name: string;
};

export type groupByMonth = {
  academies: baseAcademyBankStatement[];
  dataWithMonth: auxIAcademyReportConceptRow[];
  dataGroupByAcademy: ObjGroupByAcademy;
  dataGroupByMount: ObjGroupByMount;
  dataGroupByMountAndAcademy: ObjGroupByMountAndAcademy;
};

export type ObjGroupByMountAndAcademy = {
  [property: string]: {
    [property: string]: IAcademyReportConceptDetailsRow[];
  };
};

export type ObjGroupByMount = {
  [property: string]: IAcademyReportConceptDetailsRow[];
};

export type ObjGroupByAcademy = {
  [property: string]: IAcademyReportConceptDetailsRow[];
};
