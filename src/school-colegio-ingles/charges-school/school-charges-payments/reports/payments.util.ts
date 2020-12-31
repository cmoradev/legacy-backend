import { User } from '../../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { TypeStudent } from '../../../../school-colegio-ingles/students/interface/studentsSchool.interface';
import { add } from 'exact-math';
import { SchoolChargePayment } from '../entities/school-charge-payment.entity';

interface ResumeType {
  paymentMethod: InvoiceMethodPayment;
  cashier: User;
  quantity: number;
  change: number;
  total: number;
}

export function convertPaymentsReportCollege(payments: SchoolChargePayment[], cashiers: User[], methodsPayments: InvoiceMethodPayment[]) {
  const data = {
    matriz: [],
    payments: [],
  };
  const headers: any[] = ['Tipo', ...cashiers.map((value: User) => value && value.name), 'Total'];
  const resume: ResumeType[] = [];
  methodsPayments.forEach(paymentMethod => {
    const paymentsByMethod = payments.filter(payment => payment.methodsPayments
      .some(method => method.invoiceMethodPayment.id === paymentMethod.id));
    paymentsByMethod.forEach(payment => {
      payment.methodsPayments.filter(method => method.invoiceMethodPayment.id === paymentMethod.id)
        .forEach(filteredMethod => {
          const total = filteredMethod.quantity - (payment.change || 0);
          resume.push({
            paymentMethod,
            cashier: payment.cashierCharge,
            quantity: filteredMethod.quantity,
            change: payment.change || 0,
            total,
          });
        });
    });
  });
  const resumeDataTable = [headers];
  for (const paymentMethod of methodsPayments) {
    const resumeDataTableItem: any[] = [paymentMethod.name];
    for (const cashier of cashiers) {
      const filteredResume = resume.filter(value => value.paymentMethod.id === paymentMethod.id && value.cashier.id === cashier.id);
      resumeDataTableItem.push(filteredResume.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.total;
      }, 0));
    }
    resumeDataTableItem.push(resumeDataTableItem.reduce((previousValue, currentValue) => {
      let amount = 0;
      if (!isNaN(+currentValue)) {
        amount = +currentValue;
      }
      return previousValue + amount;
    }, 0));

    resumeDataTable.push(resumeDataTableItem);
  }

  const paymentsDetails = [];
  payments.forEach(payment => {
    if (payment.schoolCharge) {
      const { name, lastNameFather, lastNameMother } = payment.schoolCharge.schoolStudent;
      const fullName = `${name.trim() || ''} ${lastNameFather.trim() || ''} ${lastNameMother.trim() || ''}`;
      let studentType = '';
      switch (payment.schoolCharge.schoolStudent.typeStudent) {
        case TypeStudent.externo:
          studentType = 'Externo';
          break;
        case TypeStudent.student:
          studentType = 'Alumno';
          break;
        default:
          studentType = 'Prospecto';
          break;
      }
      payment.methodsPayments.forEach(paymentMethod => {
        const paymentItem = [];
        const totalPaymentsAmount = payment
          .methodsPayments
          .reduce((previousValue, currentValue) => {
            return add(previousValue, currentValue.quantity);
          }, 0);
        paymentItem.push(payment.createdAt || '');
        paymentItem.push(payment.cashierCharge.name);
        paymentItem.push(payment.stamping === 1 ? 'Si' : 'No');
        paymentItem.push(payment.folio);
        paymentItem.push(payment.schoolCharge.folio);
        paymentItem.push(studentType);
        paymentItem.push(payment.schoolCharge.schoolStudent.matricula);
        paymentItem.push(fullName);
        paymentItem.push(payment.schoolCharge.observations || '');
        paymentItem.push(paymentMethod?.invoiceMethodPayment?.name || '');
        paymentItem.push(paymentMethod.quantity);
        paymentItem.push(payment.change);
        paymentItem.push(totalPaymentsAmount - payment.change);
        paymentsDetails.push(paymentItem);
      });
    } else {
      // console.log(payment);
    }
  });
  data.matriz = resumeDataTable;
  data.payments = paymentsDetails;
  return data;
}
