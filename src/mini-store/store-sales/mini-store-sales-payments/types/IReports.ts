import {IQueryReportSaleToday} from '../../mini-store-sales/types/IReport';

export interface IQueryReportStorePayment extends IQueryReportSaleToday {
    codigoPago?: string;
    usersIds?: number[];
}

export interface IReportStorePaymentRow {
    tvp_id: number;
    f_id: number;
    tvp_folio: string;
    v_folio: string;
    f_folio?: string;
    f_uuid?: string;
    f_rfc?: string;
    f_type?: string;
    f_status?: string;
    tvp_cantidad: number;
    tvp_cambio: number;
    tvp_observaciones: string;
    p_income: number;
    a_key: string;
    a_fullname: string;
    v_cycle: string;
    v_branch_office: string;
    v_status: string;
    tvp_created_at: string;
    f_created_at?: string;
    tvp_stamping: string | number;
    tvp_state: string;
    f_metodo_pago_codigo: string;
    f_metodo_pago: string;
    tvp_global_uuid?: string;
    u_fullname_agent: string;
    us_fullname_cancelation: string;
    agent_id: number;
    cancelation_id: number;
}