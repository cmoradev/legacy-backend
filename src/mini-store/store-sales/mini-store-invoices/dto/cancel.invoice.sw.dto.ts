export class CancelInvoiceSwDto {
    cashierId: number;
    uuid: string;
    invoiceId: number;
    reason: string;
    sendMail: boolean;
    subject: string;
    body: string;
    mails: [];
    branchOfficeId: number;
    branchOfficeSettingId: number;
}
