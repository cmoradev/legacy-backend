import {IQueryReportSaleToday} from '../../../../mini-store/store-sales/mini-store-sales/types/IReport';

export interface IQueryReportAcademiaPayment extends IQueryReportSaleToday {
    codigoPago?: string;
    usersIds?: number[];
}