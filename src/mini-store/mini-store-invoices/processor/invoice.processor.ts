import { MiniStoreInvoice } from '../entities/mini-store-invoice.entity';
import { TypeStudent } from '../../../school-colegio-ingles/students/interface/studentsSchool.interface';
import { MiniStoreSaleMethodPayment } from '../../mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import { InvoiceType } from '../enums/invoice-type.enum';
import { InvoiceReport } from '../../mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { formatDate } from '../../../common/date';

export class InvoiceProcessor {
  public structureInvoiceReport(invoices: MiniStoreInvoice[]): InvoiceReport[] {
    const flatReport: InvoiceReport[] = [];
    for (const invoice of invoices) {
      let payDay;
      let paymentFolio = '';
      let paymentMethod = '';
      let billingAgent = '';
      let typeInvoice = 'Ingreso';
      switch (invoice.invoiceType) {
        case InvoiceType.expenses:
          payDay = formatDate(invoice.saleReturn.createdAt);
          paymentFolio = invoice.saleReturn.folio;
          paymentMethod = invoice.saleReturn.paymentMethod.name;
          billingAgent = `${invoice.saleReturn.agent.name} ${invoice.saleReturn.agent.lastnameFather} ${invoice.saleReturn.agent.lastnameMother}`.toUpperCase();
          typeInvoice = 'Egreso';
          break;
        default:
          payDay = formatDate(invoice.miniStoreSalePayment.createdAt);
          paymentFolio = invoice.miniStoreSalePayment.folio;
          paymentMethod = invoice.miniStoreSalePayment.miniStoreSaleMethodPayments
            .sort((a: MiniStoreSaleMethodPayment, b: MiniStoreSaleMethodPayment) => {
              if (a.quantity < b.quantity) {
                return 1;
              }
              return -1;
            })[0]?.invoiceMethod.name || '';
          billingAgent = `${invoice.agentBilling.name} ${invoice.agentBilling.lastnameFather}  ${invoice.agentBilling.lastnameMother}`.toUpperCase();
          typeInvoice = 'Ingreso';
      }
      flatReport.push({
        status: this.checkStatusInvoice(invoice.status),
        billingDate: formatDate(invoice.createdAt),
        payDay,
        folioInvoice: invoice.folio,
        paymentFolio,
        folioSale: invoice.miniStoreSale.folio,
        typePerson: invoice.miniStoreSale.student.typeStudent === TypeStudent.student ? 'Alumno' : 'Externo',
        studentName: invoice.miniStoreSale.student.searchName.trimRight().toUpperCase(),
        billingAgent,
        businessName: invoice.businessName,
        rfc: invoice.rfc,
        paymentForm: paymentMethod,
        total: invoice.total,
        uuid: invoice.uuid,
        typeInvoice,
      });
    }
    return flatReport;
  }

  private checkStatusInvoice(id: number) {
    let status = '';
    switch (id) {
      case 1:
        status = 'Activo'; // Facturado
        break;
      case 2:
        status = 'Cancelado';
        break;
      case 3:
        status = 'En Proceso de Cancelacion';
        break;
      case 4:
        status = 'No Cancelable';
        break;
      default:
        status = 'No Facturado';
    }
    return status;
  }
}
