import {IQueryReportSaleTodayOp} from '../../mini-store-sales/types/IReport';

export interface IQueryReportStorePayment extends IQueryReportSaleTodayOp {
    codigoPago?: string;
    usersIds?: number[];
}
