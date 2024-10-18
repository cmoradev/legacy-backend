import { IAcademyReportConceptRow } from '../../../academy/academy-inscription-concepts/interfaces/IQueryReport';

export type auxIAcademyReportConceptRow = {
  yearAndMonth: string;
} & IAcademyReportConceptRow;

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
    [property: string]: IAcademyReportConceptRow[];
  };
};

export type ObjGroupByMount = {
  [property: string]: IAcademyReportConceptRow[];
};

export type ObjGroupByAcademy = {
  [property: string]: IAcademyReportConceptRow[];
};
