export class CancelInvoiceSwDto {
    cashierId: number;
    uuid: string;
    invoiceId: number;
    reason: string;
    motivo: '01' | '02' | '03' | '04';
    folioSustitucion: string;
    sendMail: boolean;
    subject: string;
    body: string;
    mails: [];
    branchOfficeId: number;
    branchOfficeSettingId: number;
}
