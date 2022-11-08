import {IQueryReportSaleToday} from '../../mini-store-sales/types/IReport';

export interface IQueryReportStorePayment extends IQueryReportSaleToday {
    codigoPago?: string;
    usersIds?: number[];
}
