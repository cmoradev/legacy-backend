import { TypeStudent } from "../../school-colegio-ingles/students/interface/studentsSchool.interface";
import { PaymentStatus } from "../enums/PaymentStatus";

export interface NotInvoiced {
    p_id: number;
    v_id: number;
    f_id: number;
    p_folio: string;
    v_folio: string;
    f_folio?: string;
    f_uuid?: string;
    f_rfc?: string;
    f_type?: string;
    f_status?: string;
    p_quantity: number;
    p_change: number;
    v_observations: string;
    p_income: number;
    a_id: number;
    a_type: TypeStudent;
    a_key: string;
    a_fullname: string;
    v_cycle: number;
    v_branch_office: number;
    v_status: PaymentStatus;
    p_created_at: string;
    f_created_at?: string;
    p_stamping: string | number;
    p_state: PaymentStatus;
    f_metodo_pago_codigo: string;
    f_metodo_pago: string;
    p_global_uuid?: string;
    u_fullname_cashier?: string; // facturador pago
    us_fullname_cancelation?: string // cancelador factura;
    p_fullname_cashier?: string // cobrador pago;
    p_fullname_cancelation?: string // cancelador pago;
    cashier_id?: number;
    cancelation_id?: number;
    p_cashier_id?: number;
    p_cancelation_id?: number;
}

export interface VWPaymentExtraCharge extends NotInvoiced {
    v_created_at?: string;
    p_metodo_pago_codigo: string;
    p_metodo_pago: string;
    extras?: string;
    p_total_without_current?: number;
    details: string;
    details_names?: string
    total_details_without_extra: number;
}

export interface PaymentExtraCharge extends VWPaymentExtraCharge {
    count?: number;
    p_status_Global: number;
    totals?: {
        totalWithoutIVA: number;
        IVA: number;
    }
    charges?: {
        scholarships: number;
        discounts: number;
        surcharges: number;
    }
    concept?: {
        quantity: number;
        price: number;
        name: string;
        import: number;
    }
}

