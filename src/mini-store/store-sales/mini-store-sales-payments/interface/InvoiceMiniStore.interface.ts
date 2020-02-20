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
