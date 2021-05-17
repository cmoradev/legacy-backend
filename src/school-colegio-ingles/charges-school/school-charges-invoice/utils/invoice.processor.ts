import { SchoolChargesInvoice } from '../entities/school-charges-invoice.entity';
import { InvoiceReport } from '../../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { formatDate } from '../../../../common/date';
import { SchoolChargesMethodsPayments } from '../../school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import { TypeStudent } from '../../../students/interface/studentsSchool.interface';

export class InvoiceProcessorCollege {
  public structureInvoiceReport(invoices: SchoolChargesInvoice[]): InvoiceReport[] {
    const flatReport: InvoiceReport[] = [];
    for (const invoice of invoices) {
      let payDay;
      let paymentFolio = '';
      let paymentMethod = '';
      let billingAgent = '';
      let typeInvoice = 'Ingreso';
      if (!invoice.schoolChargePayment) {
        console.log(invoice);
      }
      payDay = formatDate(invoice.schoolChargePayment ? invoice.schoolChargePayment.createdAt : '');
      paymentFolio = invoice.schoolChargePayment ? invoice.schoolChargePayment.folio : '';
      paymentMethod = invoice.schoolChargePayment?.methodsPayments?.sort((a: SchoolChargesMethodsPayments, b: SchoolChargesMethodsPayments) => {
        if (a.quantity < b.quantity) {
          return 1;
        }
        return -1;
      })[0]?.invoiceMethodPayment.name || '';
      billingAgent = `${invoice.agentBilling.name} ${invoice.agentBilling.lastnameFather}  ${invoice.agentBilling.lastnameMother}`.toUpperCase();
      flatReport.push({
        status: this.checkStatusInvoice(invoice.status),
        billingDate: formatDate(invoice.createdAt),
        payDay,
        folioInvoice: invoice.folio,
        paymentFolio,
        folioSale: invoice.schoolCharge.folio,
        typePerson: invoice.schoolCharge.schoolStudent.typeStudent === TypeStudent.student ? 'Alumno' : 'Externo',
        studentName: invoice.schoolCharge.schoolStudent.searchName.trimRight().toUpperCase(),
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