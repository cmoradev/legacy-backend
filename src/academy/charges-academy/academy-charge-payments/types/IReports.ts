import {IQueryReportSaleTodayOp} from '../../../../mini-store/store-sales/mini-store-sales/types/IReport';

export interface IQueryReportAcademiaPayment extends IQueryReportSaleTodayOp {
    codigoPago?: string;
    usersIds?: number[];
}
