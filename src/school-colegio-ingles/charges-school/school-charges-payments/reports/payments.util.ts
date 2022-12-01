import { User } from '../../../../system/users/entities/user.entity';
import {
  InvoiceMethodPayment
} from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { TypeStudent } from '../../../students/interface/studentsSchool.interface';
import { add } from 'exact-math';
import { SchoolChargePayment } from '../entities/school-charge-payment.entity';
import { NotInvoiced } from '../../../../common/interface/not-invoiced.interface';
import {
  MiniStoreSalePayment
} from '../../../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { InvoiceModules } from '../../../../common/point-of-sale/types.pos';
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
import { calculateInvoicePrices, Charge, Concept, Decimal, FountTypeEnum, TaxPercentageEnum } from '@munyaal/calculations';
import { Detalles, ExtraCharges } from '../../../../common/point-of-sale/types.pos';
import { chargesOnCharges, totalAmountConceptAfterExtraCharge } from '../../../../common/point-of-sale/point-of-sale';
import { getChargeDetails } from '../../../../common/calculations/calculation';

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
  const ids = [];
  data.forEach((d) => {
    const index = ids.findIndex((id) => id == d.p_id);
    if (index == -1) {
      let iCashier = -1;
      let imethodsPayments = -1;
      if (isInvoice || type == InvoiceModules.SCHOOL) {
        iCashier = dataMatriz.cashiers.findIndex((c) => c.id == parseInt(`${d.cashier_id}`));
        imethodsPayments = dataMatriz.methodsPayments.findIndex((m) => m.id == parseInt(d.f_metodo_pago_codigo));
      } else {
        iCashier = dataMatriz.cashiers.findIndex((c) => c.id == parseInt(`${type == InvoiceModules.ACADEMY ? d.cashier_id : d.cashier_id_venta}`));
        imethodsPayments = dataMatriz.methodsPayments.findIndex((m) => m.id == parseInt(d.p_metodo_pago_codigo));
      }
      if (iCashier == -1) {
        dataMatriz.cashiers.push(
          isInvoice || type == InvoiceModules.SCHOOL || type == InvoiceModules.ACADEMY
            ? { id: parseInt(`${d.cashier_id}`), name: d.u_fullname_cashier } as User
            : { id: parseInt(`${d.cashier_id_venta}`), name: d.vu_fullname_cashier } as User);
      }
      if (imethodsPayments == -1) {
        dataMatriz.methodsPayments.push(
          isInvoice || type == InvoiceModules.SCHOOL
            ? { id: parseInt(d.f_metodo_pago_codigo), name: d.f_metodo_pago } as InvoiceMethodPayment
            : { id: parseInt(d.p_metodo_pago_codigo), name: d.p_metodo_pago } as InvoiceMethodPayment);
      }

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
      ids.push(d.p_id);
    }
  })

  dataMatriz.payments = paymentsArray;

  return dataMatriz;
}

export const getMatrizPayments = (payments: SchoolChargePayment[] | MiniStoreSalePayment[] | AcademyChargePayments[], cashiers: User[], methodsPayments: InvoiceMethodPayment[], type: InvoiceModules) => {
  const headers: any[] = ['Tipo', ...cashiers.map((value: User) => value && value.name), 'Total'];
  const resume: ResumeType[] = [];
  methodsPayments.push({ code: '00', name: 'Totales' } as InvoiceMethodPayment)
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

  const totales = []
  for (let x = 1; x < resumeDataTable[0].length; x++) {
    let suma = 0;
    for (let y = 1; y < resumeDataTable.length; y++) {
      suma += resumeDataTable[y][x];
    }
    totales.push(suma)
  }
  totales.forEach((t, i) => {
    resumeDataTable[resumeDataTable.length - 1][i + 1] = t;
  })


  return resumeDataTable;
}

export const getDataCharges = (data: NotInvoiced[] = [], type: InvoiceModules, isSale: boolean = false) => {

  return data.map((d: any) => {

    let charges: Charge[] = [];
    const objDetails = getExtraChargesDetails(d);
    const extraCharges: ExtraCharges[] = objDetails.extraCharges
    const detail: Detalles = {
      extraCharges,
      id: d.vd_id,
      price: parseInt(d.vd_price_IVA),
      priceWithIVA: parseInt(d.vd_price_IVA),
      quantity: parseInt(d.vd_quantity)
    };

    let objAcademy = undefined;
    if (type == InvoiceModules.ACADEMY) {
      objAcademy = chargesOnCharges(detail);
      charges = getChargeDetails({ extraCharges: extraCharges } as Detalles, InvoiceModules.ACADEMY)
    }

    let totalIVA = 0;
    const total = Decimal.mul(d.vd_quantity, d.vd_price_IVA).toNumber();
    const discounts = type == InvoiceModules.ACADEMY ? objAcademy.discount : Decimal.sub(total, totalAmountConceptAfterExtraCharge(detail, 1)).toNumber();
    const scholarships = type == InvoiceModules.ACADEMY ? objAcademy.scholarship : Decimal.sub(total, totalAmountConceptAfterExtraCharge(detail, 3)).toNumber();
    const surcharges = type == InvoiceModules.ACADEMY ? objAcademy.surcharge : Decimal.sub(total, totalAmountConceptAfterExtraCharge(detail, 2)).toNumber();
    if (type != InvoiceModules.ACADEMY) {
      switch (type) {
        case InvoiceModules.SCHOOL:
          charges = getChargeDetails({ extraCharges: extraCharges } as Detalles, InvoiceModules.SCHOOL)
          //totalIVA = Decimal.sub(Decimal.sum(total, surcharges), Decimal.sum(discounts, scholarships)).toNumber();
          break;
        case InvoiceModules.STORE:
          charges = getChargeDetails({ extraCharges: extraCharges } as Detalles, InvoiceModules.STORE)
          totalIVA = totalAmountConceptAfterExtraCharge(detail, 1);
          break;
      }
    } else {
      totalIVA = Decimal.sub(Decimal.sum(total, surcharges), Decimal.sum(discounts, scholarships)).toNumber();
    }

    const calculation = calculateInvoicePrices({
      payment: {
        amount: isSale ? total : d.p_income,
        change: 0
      },
      concepts: [{
        id: d.vd_id,
        quantity: 1,
        basePrice: isSale ? total : d.p_income,
        name: '',
        charges,
      } as Concept],
      fountType: type === InvoiceModules.ACADEMY ? FountTypeEnum.DISCOUNT_ON_DISCOUNT : FountTypeEnum.TRADITIONAL,
      ivaPercentage: type === InvoiceModules.SCHOOL ? TaxPercentageEnum.T0 : TaxPercentageEnum.T16
    });
    return {
      ...d,
      totalIVA,
      total,
      v_status: parseInt(`${d.v_status}`),
      types_charges: objDetails.types_charges.map((p: string) => { return parseInt(`${p}`) }),
      aplications_charges: objDetails.aplications_charges.map((p: string) => { return parseInt(`${p}`) }),
      quantyties_charges: objDetails.quantyties_charges.map((p: string) => { return parseInt(`${p}`) }),
      charges: {
        discounts,
        scholarships,
        surcharges
      },
      totals: {
        IVA: calculation.detailsWithPaymentApplied.tax,
        totalWithoutIVA: type == InvoiceModules.ACADEMY ? Decimal.sub(isSale ? total : d.p_income, calculation.detailsWithPaymentApplied.tax).toNumber() : calculation.detailsWithPaymentApplied.amount,
      }
    } as NotInvoiced
  });
}

const removeDuplicates = (originalArray: any, prop: any) => {
  var newArray = [];
  var lookupObject: any  = {};

  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}


export const getDataFullMatrizAndData = (result: any[] = [], type: InvoiceModules, isInvoice: boolean) => {
  const dataMatriz = getDataMatrizPayments(result, type, isInvoice);

  switch (type) {
    case InvoiceModules.SCHOOL:
      dataMatriz.payments as SchoolChargePayment[];
      break;
    case InvoiceModules.STORE:
      dataMatriz.payments as MiniStoreSalePayment[];
      break;
    case InvoiceModules.ACADEMY:
      dataMatriz.payments as AcademyChargePayments[];
      break;
    default:
      break;
  }
  const matriz = getMatrizPayments(dataMatriz.payments, dataMatriz.cashiers, dataMatriz.methodsPayments, type);
  let data: any[] = [];
  let dataCharge = getDataCharges(result, type);
  if(isInvoice && type == InvoiceModules.SCHOOL){
    const dataDuplicates = dataCharge.map((d)=>{
      return {
        ...d,
        vd_id: `${d.p_id}${d.vd_id}`
      }
    });
    dataCharge = removeDuplicates(dataDuplicates,'vd_id')
  }
  dataCharge.forEach((r) => {
    const index = data.findIndex((d) => d.p_id == r.p_id);
    if (index > -1) {
      data[index].total = Decimal.sum(r.total, data[index].total).toNumber(),
        data[index].totalIVA = Decimal.sum(r.totalIVA, data[index].totalIVA).toNumber(),
        data[index].charges = {
          discounts: Decimal.sum(r.charges.discounts, data[index].charges.discounts).toNumber(),
          scholarships: Decimal.sum(r.charges.scholarships, data[index].charges.scholarships).toNumber(),
          surcharges: Decimal.sum(r.charges.surcharges, data[index].charges.surcharges).toNumber(),
        }
    } else {
      data.push({ ...r, p_status_Global: null })
    }
  });
  data.forEach((d, i) => {
    const totalsPayments = Decimal.add(d.p_total_without_current != null ? d.p_total_without_current : 0, d.p_income);
    const subtotalSale = Decimal.sub(Decimal.add(d.total, d.charges.surcharges), Decimal.add(d.charges.discounts, d.charges.scholarships));

    // 1 completo, 2 completo diferido, 3 incompleto diferido
    if (totalsPayments.toNumber() == subtotalSale.toNumber()) {
      if (d.p_total_without_current != null) {
        // pago diferido de una venta completa
        data[i].p_status_Global = 2
      } else {
        // pago en una sola exhibision
        data[i].p_status_Global = 1
      }
    } else {
      data[i].p_status_Global = 3
      //pago diferido de una venta incompleta
    }
  })
  return {
    data: data,
    dataConverter: dataMatriz,
    matriz: matriz
  }
}

const getExtraChargesDetails = (d: any, isPreDataCharge: boolean = true) => {
  let types_charges = [];
  let aplications_charges = [];
  let quantyties_charges = [];

  if (isPreDataCharge) {
    d.types_charges != null ? types_charges = d.types_charges.split(',') : [];
    d.aplications_charges != null ? aplications_charges = d.aplications_charges.split(',') : [];
    d.quantyties_charges != null ? quantyties_charges = d.quantyties_charges.split(',') : [];
  } else {
    types_charges = d.types_charges;
    aplications_charges = d.aplications_charges;
    quantyties_charges = d.quantyties_charges;
  }
  const extraCharges: ExtraCharges[] = [];
  for (let index = 0; index < types_charges.length; index++) {
    extraCharges.push({
      applicationType: parseInt(aplications_charges[index]),
      quantity: parseInt(quantyties_charges[index]),
      typeExtraCharge: parseInt(types_charges[index])
    })
  }
  return {
    extraCharges: extraCharges,
    types_charges: types_charges,
    aplications_charges: aplications_charges,
    quantyties_charges: quantyties_charges
  };
}
