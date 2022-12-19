import {
    SchoolChargesMethodsPayments
} from '../../../school-colegio-ingles/charges-school/school-charges-methods-payments/entities/school-charges-methods-payments.entity'
import {
    MiniStoreSaleMethodPayment
} from '../../../mini-store/store-sales/mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import {
    AcademyChargeMethodsPayments
} from '../../../academy/charges-academy/academy-charge-methods-payments/entities/academy-charge-methods-payments.entity';
import { SchoolChargePayment } from "../../../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity";
import { AcademyChargePayments } from "../../../academy/charges-academy/academy-charge-payments/entities/academy-charge-payments.entity";
import { MiniStoreSalePayment } from "../../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity";
import { Decimal } from '@munyaal/calculations';
import { InvoiceMethodPayment } from "../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity";
import { Detalles, ExtraCharges, InvoiceModules } from "../../../common/point-of-sale/types.pos";
import { VWPaymentExtraCharge } from "../../../common/interface/not-invoiced.interface";
import { ConceptsPriceByPaymentBilligCalculation } from "../../../common/calculations/calculation";
import { User } from "../../../system/users/entities/user.entity";
import { ConceptSchoolAndAcademy } from '../../../common/calculations/TypesCalculation';
import { saleDetailsCalculations, validValue } from './sales.calculation';

interface ResumeType {
    paymentMethod: InvoiceMethodPayment;
    cashier: User;
    quantity: number;
    change: number;
    total: number;
}

export const getDataMatrizPayments = (data: VWPaymentExtraCharge[], type: InvoiceModules, isInvoice: boolean = false, status: number) => {
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

            if (isInvoice) {
                // status 1 - facturado
                iCashier = dataMatriz.cashiers.findIndex(
                    (c) => c.id == (status == 1 ? parseInt(`${d.cashier_id}`) : parseInt(`${d.cancelation_id}`))
                );
            } else {
                // estatus 2 - activo
                iCashier = dataMatriz.cashiers.findIndex(
                    (c) => c.id == (status == 2 ? parseInt(`${d.p_cashier_id}`) : parseInt(`${d.p_cancelation_id}`))
                );
            }
            imethodsPayments = dataMatriz.methodsPayments.findIndex((m) => m.id == (
                isInvoice 
                ? parseInt(d.f_metodo_pago_codigo != null ? d.f_metodo_pago_codigo : d.p_metodo_pago_codigo) 
                : parseInt(d.p_metodo_pago_codigo)));

            if (iCashier == -1) {
                let objCashier = { id: 0, name: "" };
                if (isInvoice) {
                    // status 1 - facturado
                    status == 1
                        ? objCashier = { id: parseInt(`${d.cashier_id}`), name: d.u_fullname_cashier }
                        : objCashier = { id: parseInt(`${d.cancelation_id}`), name: d.us_fullname_cancelation };
                } else {
                    // estatus 2 - activo
                    status == 2
                        ? objCashier = { id: parseInt(`${d.p_cashier_id}`), name: d.p_fullname_cashier }
                        : objCashier = { id: parseInt(`${d.p_cancelation_id}`), name: d.p_fullname_cancelation };
                }

                dataMatriz.cashiers.push(objCashier as User);
            }

            if (imethodsPayments == -1) {
                dataMatriz.methodsPayments.push(
                    isInvoice
                        ? { id: parseInt(d.f_metodo_pago_codigo != null ? d.f_metodo_pago_codigo : d.p_metodo_pago_codigo), name: d.f_metodo_pago != null ? d.f_metodo_pago : d.p_metodo_pago } as InvoiceMethodPayment
                        : { id: parseInt(d.p_metodo_pago_codigo), name: d.p_metodo_pago } as InvoiceMethodPayment);
            }

            let userObj = {} as User;
            let invoiceMethodPaymentObj = {};
            if (isInvoice) {
                // status 1 - facturado
                userObj = status == 1 ? { id: parseInt(`${d.cashier_id}`), name: d.u_fullname_cashier } as User : { id: parseInt(`${d.cancelation_id}`), name: d.p_fullname_cancelation } as User;
            } else {
                // estatus 2 - activo
                userObj = status == 2 ? { id: parseInt(`${d.p_cashier_id}`), name: d.p_fullname_cashier } as User : { id: parseInt(`${d.p_cancelation_id}`), name: d.p_fullname_cancelation } as User;
            }
            invoiceMethodPaymentObj = {
                id: isInvoice ? parseInt(d.f_metodo_pago_codigo != null ? d.f_metodo_pago_codigo : d.p_metodo_pago_codigo) : parseInt(d.p_metodo_pago_codigo),
                name: isInvoice ? `${d.f_metodo_pago != null ? d.f_metodo_pago : d.p_metodo_pago }` : d.p_metodo_pago
            }
            switch (type) {
                case InvoiceModules.SCHOOL:
                    paymentsArray.push({
                        cashierCharge: userObj,
                        change: parseFloat(`${d.p_change}`),
                        methodsPayments: [{
                            quantity: parseFloat(`${d.p_quantity}`),
                            invoiceMethodPayment: invoiceMethodPaymentObj as Partial<InvoiceMethodPayment>
                        } as Partial<SchoolChargesMethodsPayments>] as SchoolChargesMethodsPayments[]
                    } as SchoolChargePayment);
                    break;
                case InvoiceModules.STORE:
                    paymentsArray.push({
                        agent: userObj,
                        change: parseFloat(`${d.p_change}`),
                        miniStoreSaleMethodPayments: [{
                            quantity: parseFloat(`${d.p_quantity}`),
                            invoiceMethodPayment: invoiceMethodPaymentObj as Partial<InvoiceMethodPayment>
                        } as Partial<MiniStoreSaleMethodPayment>] as MiniStoreSaleMethodPayment[]
                    } as MiniStoreSalePayment);
                    break;
                case InvoiceModules.ACADEMY:
                    paymentsArray.push({
                        cashierCharge: userObj,
                        change: parseFloat(`${d.p_change}`),
                        methodsPayments: [{
                            quantity: parseFloat(`${d.p_quantity}`),
                            invoiceMethodPayment: invoiceMethodPaymentObj as Partial<InvoiceMethodPayment>
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
                paymentsByMethod = paymentSchool.filter(payment => payment.methodsPayments.some(method => method.invoiceMethodPayment.id === paymentMethod.id));
                break;
            case InvoiceModules.STORE:
                const paymentStore = payments as MiniStoreSalePayment[]
                paymentsByMethod = paymentStore.filter(payment => payment.miniStoreSaleMethodPayments.some(method => method.invoiceMethodPayment.id === paymentMethod.id));
                break;
            case InvoiceModules.ACADEMY:
                const paymentAcademy = payments as AcademyChargePayments[]
                paymentsByMethod = paymentAcademy.filter(payment => payment.methodsPayments.some(method => method.invoiceMethodPayment.id === paymentMethod.id));
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

export const getDataCharges = (data: VWPaymentExtraCharge[] = [], type: InvoiceModules, isSale: boolean = false) => {

    return data.map((d: any) => {
        const objDetailsExtra = getExtraChargesDetails(d);
        const detailsGlobal = [];
        objDetailsExtra.forEach((obj) => {
            const detail: Detalles = {
                extraCharges: obj.extraCharges,
                id: obj.id,
                price: obj.priceWithIVA,
                priceWithIVA: obj.priceWithIVA,
                quantity: obj.quantity,
            };
            detailsGlobal.push({
                ...detail,
                sat_code: '',
                unitMeasurement: '',
                concept: '',
                codeUnit: '',
                codeConcept: '',
                unidad: '',
                productCode: '',
                productName: '',
                academyInscriptionConcept: { description: '' },
                miniStoreProduct: { name: '' },
                schoolPlanPayment: { description: '' }
            });
        });

        const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
            payment: { change: isSale ? 0 : d.p_change, quantity: isSale ? saleDetailsCalculations({
                details: detailsGlobal,
                type
            }).total : d.p_quantity },
            details: detailsGlobal,
            type,
            typeConcept: 'Recepit',
        });

        const concepts = type == InvoiceModules.STORE
            ? invoiceDetails.concepts.conceptsMiniStore
            : invoiceDetails.concepts.conceptsSchoolAndAcademy;

        return {
            ...d,
            sale_details: detailsGlobal,
            v_status: parseInt(`${d.v_status}`),
            charges: {
                scholarships: validValue(type != InvoiceModules.STORE ? concepts.map((c: ConceptSchoolAndAcademy) => c.beca) : []),
                discounts: validValue(concepts.map((c: ConceptSchoolAndAcademy) => c.descuento)),
                surcharges: validValue(concepts.map((c: ConceptSchoolAndAcademy) => c.recargo)),
            },
            totals: {
                IVA: invoiceDetails.totals.receipt.Impuesto,
                totalWithoutIVA: Decimal.sub(invoiceDetails.totals.receipt.SubTotal, invoiceDetails.totals.fiscal.Descuento).toNumber(),
            }
        }
    });
}

export const getDataFullMatrizAndData = (result: VWPaymentExtraCharge[] = [], type: InvoiceModules, isInvoice: boolean = false, status: number) => {
    const dataMatriz = getDataMatrizPayments(result, type, isInvoice, status);
    console.log(JSON.stringify(dataMatriz, null, 3))
    const matriz = getMatrizPayments(dataMatriz.payments, dataMatriz.cashiers, dataMatriz.methodsPayments, type);
    let data = getDataCharges(result, type);
    data.forEach((d, i) => {
        const totalsPayments = Decimal.add(d.p_total_without_current != null ? d.p_total_without_current : 0, d.p_income);
        const subtotalSale = saleDetailsCalculations({
            details:d.sale_details,
            type
        }).total;
        // 1 completo, 2 completo diferido, 3 incompleto diferido
        if (totalsPayments.toNumber() == subtotalSale) {
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


const getExtraChargesDetails = (d: VWPaymentExtraCharge) => {
    let extras = [];
    let details = [];
    let extras_details: { idDetails: number, extras: ExtraCharges[] }[] = [];
    let array_details: any[] = [];
    d.extras != null ? extras = d.extras.split(',') : [];
    d.details != null ? details = d.details.split(',') : [];
    extras.forEach((e) => {
        const detailExtra = e.split(';');
        const index = extras_details.findIndex((ee) => ee.idDetails == detailExtra[0]);
        if (index == -1) {
            extras_details.push({
                idDetails: parseInt(detailExtra[0]),
                extras: [{
                    typeExtraCharge: parseInt(detailExtra[1]),
                    quantity: parseInt(detailExtra[2]),
                    applicationType: parseInt(detailExtra[3])
                }]
            })
        } else {
            extras_details[index].extras.push({
                typeExtraCharge: parseInt(detailExtra[1]),
                quantity: parseInt(detailExtra[2]),
                applicationType: parseInt(detailExtra[3])
            })
        }
    });
    details.forEach((det) => {
        const detailObj = det.split(';');
        const index = array_details.findIndex((ad) => ad.id == detailObj[0]);
        if (index == -1) {
            array_details.push({
                id: detailObj[0],
                quantity: detailObj[1],
                priceWithIVA: detailObj[2],
            })
        }
    });

    return array_details.map((a) => {
        const indexExtras = extras_details.findIndex((e) => e.idDetails == a.id);
        return {
            ...a,
            extraCharges: indexExtras == -1 ? [] : extras_details[indexExtras].extras
        }
    });
}

