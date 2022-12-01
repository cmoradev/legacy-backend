import { IQueryReportSaleTodayOp } from '../../../../mini-store/store-sales/mini-store-sales/types/IReport';

export interface IQueryReportSchoolPayment extends IQueryReportSaleTodayOp {
    codigoPago?: string;
    usersIds?: number[];
}
