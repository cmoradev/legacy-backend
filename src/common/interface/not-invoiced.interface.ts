export interface NotInvoiced {
    p_id: number;
    f_id: number;
    v_folio: string;
    p_folio: string;
    f_folio?: string;
    f_uuid?: string;
    f_rfc?: string;
    f_type?: string;
    f_status?: string;
    p_quantity: number;
    p_change: number;
    v_observations: string;
    p_income: number;
    a_key: string;
    a_fullname: string;
    v_branch_office: string;
    v_cycle: string;
    v_status: string;
    p_created_at: string;
    f_created_at?: string;
    p_stamping: string | number;
    p_state: string;
    f_metodo_pago: number;
    f_metodo_pago_codigo: number;
    p_global_uuid?: string;
    u_fullname_cashier: string;
    us_fullname_cancelation: string;
}
