export interface NotInvoiced {
    p_id: number;
    v_id: number;
    f_id: number;
    v_folio: string;
    p_folio: string;
    f_folio?: string;
    f_uuid?: string;
    f_rfc?: string;
    f_type?: string;
    f_status?: string;
    p_quantity: number[]; //school payment number
    p_change: number; //school payment number
    v_observations: string; //school payment number
    p_income: number;
    p_total_without_current?: number; // suma de otros pagos sin contar el actual para saber si es diferido.
    p_status_Global?: number | null; // 1 completo, 2 completo diferido, 3 incompleto diferido
    a_id: number; // id alumno/cliente/props
    a_tipo: string; // tipo de alumno/cliente/props
    a_key: string; // matricula de alumno/cliente/props
    a_fullname: string; // nombre alumno/cliente/props
    v_branch_office: string;
    v_cycle: string;
    v_status: string;
    p_created_at: string;
    f_created_at?: string;
    p_stamping: string | number;
    p_state: string;
    f_metodo_pago: string; //school payment number
    f_metodo_pago_codigo: string; //school payment number
    p_metodo_pago: string; //mini store payment number
    p_metodo_pago_codigo: string;//mini store payment number
    p_global_uuid?: string; //school payment number
    u_fullname_cashier: string; //school payment number
    us_fullname_cancelation: string; //school payment number
    uf_fullname_cashier: string; //school sale
    usf_fullname_cancelation: string; //school sale
    cashier_id: number; //mini store payment number
    cancelation_id: number;
    vu_fullname_cashier: string, //mini store payment number
    vuc_fullname_cancelation: string, //mini store payment number
    cashier_id_venta: number,
    cancelation_id_venta: number; //academy payment number
    bf_branch_office: number; //academy payment number
    bf_branch_office_name: string; //academy payment number
    count?: number; //contar ventas - pagos
    vd_id: number; //mini store sale 
    vd_created_at: string; //mini store sale 
    vd_product_name: string; //mini store sale 
    vd_quantity: number; //mini store sale 
    vd_price: number; //mini store sale 
    vd_price_IVA: number; //mini store sale 
    totalIVA: number; //mini store sale 
    total: number; //mini store sale 
    vd_is_IVA: string; //mini store sale 
    types_charges: number[],
    quantyties_charges: number[],
    aplications_charges: number[],
    totals?: {
       totalWithoutIVA: number; 
       IVA: number;
    }
    charges?: {
        scholarships: number;
        discounts: number;
        surcharges: number;
    }
}
