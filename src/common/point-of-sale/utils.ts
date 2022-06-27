import { sumQuantity } from './point-of-sale';
import { ivaFromFinalAmount } from '../numbers';
import { NotInvoiced } from '../interface/not-invoiced.interface';
import { InvoiceDetails, Concept, Detalles, InvoiceModules } from './types.pos';
import { AcademyChargeDetails } from '../../academy/charges-academy/academy-charge-details/entities/academy-charge-details.entity';
import { MiniStoreSaleDetail } from '../../mini-store/store-sales/mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { SchoolChargeDetails } from '../../school-colegio-ingles/charges-school/school-charges-details/entities/school-charge-details.entity';

export const getAmounts = (payments: NotInvoiced[], percentageTax: number = 0.16) => {
    let subtotal = 0;
    let taxes = 0;
    let total = 0;

    for (const value of payments) {
        const { finalAmount, iva, amountWithOutIva } = ivaFromFinalAmount(value.p_income, -2, sumQuantity(percentageTax, 1));

        total = sumQuantity(finalAmount, total);
        taxes = sumQuantity(iva, taxes);
        subtotal = sumQuantity(amountWithOutIva, subtotal);
    }


    return {
        subtotal,
        taxes,
        total,
    };
}
export const getDetailsPaymentsGlobal = (payments: NotInvoiced[] = [], objectImp: string, percentageTax: number = 0.16): InvoiceDetails => {
    const { total, subtotal, taxes } = getAmounts(payments, percentageTax);

    const details: Concept[] = payments.map((payment): Concept => {
        return {
            keyProdServ: '01010101',
            noIdentity: payment.p_folio,
            quantity: '1',
            keyUnit: 'ACT',
            description: `Venta ${payment.v_folio}, Pago ${payment.p_folio}`,
            unitValue: `${payment.p_income}`,
            amount: `${payment.p_income}`,
            discount: '0.00',
            objectImp
        }
    });

    return {
        total,
        taxes,
        subtotal,
        discount: 0,
        details
    };
};

export const getMoreDatails = <D extends Detalles>(payload: {
    detail: D,
    type: InvoiceModules
}) => {
    const { type, detail } = payload
    const data = {
        claveProd: "",
        ClaveUnidad: "",
        descrption: "",
        Unidad: "",
    }
    switch (type) {
        case InvoiceModules.ACADEMY:
            const dAcademy = detail as unknown as AcademyChargeDetails
            data.claveProd = dAcademy.sat_code;
            data.ClaveUnidad = dAcademy.unitMeasurement;
            data.descrption = dAcademy.concept ? dAcademy.concept : dAcademy.academyInscriptionConcept.description;
            break;
        case InvoiceModules.SCHOOL:
            const dSchool = detail as unknown as SchoolChargeDetails
            const clave = dSchool.codeUnit && dSchool.codeUnit === "E1" ? 'E48' : dSchool.codeUnit;
            data.claveProd = dSchool.codeConcept;
            data.ClaveUnidad = clave || 'E48';
            data.Unidad = dSchool.unidad || '';
            data.descrption = dSchool.concept ? dSchool.concept : dSchool.schoolPlanPayment.description;
            break;
        case InvoiceModules.STORE:
            const dStore = detail as unknown as MiniStoreSaleDetail
            data.claveProd = dStore.productCode;
            data.ClaveUnidad = dStore.unitMeasurement; // detail.miniStoreProduct.unity,
            data.descrption = dStore.productName ? dStore.productName : dStore.miniStoreProduct.name;
            //  data.Unidad = dStore.unidad || '';
            break;
        default:
            break;
    }
    return data
}