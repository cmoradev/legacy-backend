import { BusinessNameFamily } from '../../../../school-colegio-ingles/family-fiscal/entities/BusinessNameFamily.entity';

export interface InvoiceReport {
    status: string;
    billingDate: Date | string;
    payDay: Date | string;
    folioInvoice: string;
    paymentFolio: string;
    folioSale: string;
    typePerson: string;
    studentName: string;
    billingAgent: string;
    businessName: string;
    rfc: string;
    paymentForm: string;
    total: string | number;
    uuid: string;
    typeInvoice: string;
}

export interface QuerySimpleReport {
    status: number;
    startDate: Date;
    endDate: Date;
    cashier?: number;
    onlyFile: boolean;
    invoiceStatus?: number;
    branchOfficeId: number;
}
export interface InformacionGlobal {
    Periodicidad: string;
    Meses: string;
    Año: string;
}
export class QueryBilling {
    saleId: number;
    salePaymentId: number;
    branchOfficeId: number;
    branchOfficeSettingId: number;
    informacionGlobal?: InformacionGlobal;
    usoCfdi: {
        value: string,
        label: string
    };
    receiver: BusinessNameFamily
    agentBillingId: number;
}
