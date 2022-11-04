import {User} from '../../../../system/users/entities/user.entity';
import {
  InvoiceMethodPayment
} from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import {TypeStudent} from '../../../students/interface/studentsSchool.interface';
import {add} from 'exact-math';
import {SchoolChargePayment} from '../entities/school-charge-payment.entity';
import {NotInvoiced} from '../../../../common/interface/not-invoiced.interface';
import {
  MiniStoreSalePayment
} from '../../../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import {InvoiceModules} from '../../../../common/point-of-sale/types.pos';
import {
  SchoolChargesMethodsPayments
} from '../../school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import {
  MiniStoreSaleMethodPayment
} from '../../../../mini-store/store-sales/mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import {
  AcademyChargePayments
} from '../../../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity';
import {
  AcademyChargeMethodsPayments
} from '../../../../academy/charges-academy/academy-charge-methods-payments/entities/academy-charge-methods-payments.entity';

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
      const fullName = `${(name !== undefined && name !== null) ? name.trim() : ''} ${(lastNameFather !== undefined && lastNameFather !== null) ? lastNameFather.trim() : ''} ${(lastNameMother !== undefined && lastNameMother !== null) ? lastNameMother.trim() : ''}`;
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
    }
  });
  data.matriz = resumeDataTable;
  data.payments = paymentsDetails;
  return data;
}

export const getDataMatrizPayments = (data: NotInvoiced[], type: InvoiceModules, isInvoice: boolean) => {
  const dataMatriz: {
    payments: SchoolChargePayment[] | MiniStoreSalePayment[] | AcademyChargePayments[],
    cashiers: User[],
    methodsPayments: InvoiceMethodPayment[]
  } = {
    payments: [],
    cashiers: [],
    methodsPayments: []
  }

  const paymentsArray = [];
  data.forEach((d) => {
    console.log(JSON.stringify(d, null,3))
    let iCashier = -1;
    let imethodsPayments = -1;
    if (isInvoice || type == InvoiceModules.SCHOOL) {
      iCashier = dataMatriz.cashiers.findIndex((c) => c.id == parseInt(`${d.cashier_id}`));
      imethodsPayments = dataMatriz.methodsPayments.findIndex((m) => m.id == parseInt( d.f_metodo_pago_codigo));
    } else {
      iCashier = dataMatriz.cashiers.findIndex((c) => c.id == parseInt(`${ type == InvoiceModules.ACADEMY ? d.cashier_id :d.cashier_id_venta}`));
      imethodsPayments = dataMatriz.methodsPayments.findIndex((m) => m.id == parseInt( d.p_metodo_pago_codigo));
    }
    if (iCashier == -1){
      dataMatriz.cashiers.push(
        isInvoice || type == InvoiceModules.SCHOOL || type == InvoiceModules.ACADEMY
          ? { id: parseInt(`${d.cashier_id}`), name: d.u_fullname_cashier } as User
          : { id: parseInt(`${d.cashier_id_venta}`), name: d.vu_fullname_cashier } as User);
    } 
    if (imethodsPayments == -1){
      dataMatriz.methodsPayments.push(
        isInvoice || type == InvoiceModules.SCHOOL
        ? { id: parseInt(d.f_metodo_pago_codigo), name: d.f_metodo_pago } as InvoiceMethodPayment 
        : { id: parseInt (d.p_metodo_pago_codigo), name: d.p_metodo_pago } as InvoiceMethodPayment);}

    switch (type) {
      case InvoiceModules.SCHOOL:
        paymentsArray.push({
          cashierCharge: { name: d.u_fullname_cashier, id: d.cashier_id } as User,
          change: parseFloat(`${d.p_change}`),
          methodsPayments: [{
            quantity: parseFloat(`${d.p_quantity}`),
            invoiceMethodPayment: {
              id: parseInt(d.f_metodo_pago_codigo),
              name: d.f_metodo_pago
            } as Partial<InvoiceMethodPayment>
          } as Partial<SchoolChargesMethodsPayments>] as SchoolChargesMethodsPayments[]
        } as SchoolChargePayment);
        break;
      case InvoiceModules.STORE:
        paymentsArray.push({
          agent: isInvoice ? { name: d.u_fullname_cashier, id: d.cashier_id } as User : { name: d.vu_fullname_cashier, id: d.cashier_id_venta } as User,
          change: parseFloat(`${d.p_change}`),
          miniStoreSaleMethodPayments: [{
            quantity: parseFloat(`${d.p_quantity}`),
            invoiceMethodPayment: {
              id: isInvoice ? parseInt(d.f_metodo_pago_codigo) : parseInt(d.p_metodo_pago_codigo),
              name: isInvoice ? d.f_metodo_pago : d.p_metodo_pago
            } as Partial<InvoiceMethodPayment>
          }] as Partial<MiniStoreSaleMethodPayment>
        } as MiniStoreSalePayment);
        break;
      case InvoiceModules.ACADEMY:
        paymentsArray.push({
          cashierCharge: { name: d.u_fullname_cashier, id: d.cashier_id } as User,
          change: parseFloat(`${d.p_change}`),
          methodsPayments: [{
            quantity: parseFloat(`${d.p_quantity}`),
            invoiceMethodPayment: {
              id: isInvoice ? parseInt(d.f_metodo_pago_codigo) : parseInt(d.p_metodo_pago_codigo),
              name: isInvoice ? d.f_metodo_pago : d.p_metodo_pago
            } as Partial<InvoiceMethodPayment>
          } as Partial<AcademyChargeMethodsPayments>] as AcademyChargeMethodsPayments[]
        } as AcademyChargePayments);
        break;
      default:
        break;
    }
  })

  dataMatriz.payments = paymentsArray;

  return dataMatriz;
}

export const getMatrizPayments = (payments: SchoolChargePayment[] | MiniStoreSalePayment[] | AcademyChargePayments[], cashiers: User[], methodsPayments: InvoiceMethodPayment[], type: InvoiceModules) => {
  const headers: any[] = ['Tipo', ...cashiers.map((value: User) => value && value.name), 'Total'];
  const resume: ResumeType[] = [];
  methodsPayments.forEach(paymentMethod => {
    let paymentsByMethod = [];

    switch (type) {
      case InvoiceModules.SCHOOL:
        const paymentSchool = payments as SchoolChargePayment[]
        paymentsByMethod = paymentSchool.filter(payment => payment.methodsPayments
          .some(method => method.invoiceMethodPayment.id === paymentMethod.id));
        break;
      case InvoiceModules.STORE:
        const paymentStore = payments as MiniStoreSalePayment[]
        paymentsByMethod = paymentStore.filter(payment => payment.miniStoreSaleMethodPayments
          .some(method => method.invoiceMethodPayment.id === paymentMethod.id));
        break;
      case InvoiceModules.ACADEMY:
        const paymentAcademy = payments as AcademyChargePayments[]
        paymentsByMethod = paymentAcademy.filter(payment => payment.methodsPayments
          .some(method => method.invoiceMethodPayment.id === paymentMethod.id));
        break;
      default:
        break;
    }

    paymentsByMethod.forEach(payment => {
      if (type == InvoiceModules.STORE) {
        payment.miniStoreSaleMethodPayments.filter(method => method.invoiceMethodPayment.id === paymentMethod.id)
          .forEach(filteredMethod => {
            const total = filteredMethod.quantity - (payment.change || 0);
            resume.push({
              paymentMethod,
              cashier: payment.agent,
              quantity: filteredMethod.quantity,
              change: payment.change || 0,
              total,
            });
          });
      } else {
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
      }
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

  return resumeDataTable;
}
