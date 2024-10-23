import {
  calculateInvoicePrices,
  Charge,
  ChargeApplicationEnum,
  ChargeTypeEnum,
  Concept,
  Decimal,
  FountTypeEnum,
  Payment,
  TaxPercentageEnum,
} from '@munyaal/calculations';
import { SystemTypeExtraChargesEnum } from '../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { TypeChargeApplicationEnum } from '../../../system/system-extra-charges/enums/system-extra-charges.enum';
import {
  ExtraCharges,
  InvoiceModules,
} from '../../../common/point-of-sale/types.pos';
import { getDataCharges } from './payments.calculation';
import { ConceptsPriceByPaymentBilligCalculation } from '../../../common/calculations/calculation';
import { ConceptSchoolAndAcademy } from '../../../common/calculations/TypesCalculation';

export const saleDetailsCalculations = (payload: {
  details: any[];
  type: InvoiceModules;
}) => {
  const { details = [], type } = payload;

  let obj = {} as any;
  let quantitySum = 0;
  details.forEach((d: any) => {
    let iva = type == InvoiceModules.SCHOOL ? 1 : 1.16;
    let price =
      type == InvoiceModules.STORE
        ? d?.priceWithIVA || 0
        : Decimal.mul(d?.price || 0, iva).toDecimalPlaces(2);
    quantitySum = Decimal.add(quantitySum, price).toNumber();
  });
  const payment: Payment = { amount: quantitySum, change: 0 };
  switch (type) {
    case InvoiceModules.ACADEMY:
      obj = ConceptsTotals({
        payment,
        details,
        type: InvoiceModules.ACADEMY,
        baseDefault: 1,
      });
      break;
    case InvoiceModules.SCHOOL:
      obj = ConceptsTotals({
        payment,
        details,
        type: InvoiceModules.SCHOOL,
        ivaDefault: 1,
        ivaByDetail: 0,
        baseDefault: 1,
      });

      break;
    case InvoiceModules.STORE:
      obj = ConceptsTotals({
        payment,
        details,
        type: InvoiceModules.STORE,
        baseDefault: 1,
      });
      break;
    default:
      break;
  }
  if (details.length !== 0) {
    return {
      subtotal: parseFloat(obj.subtotal.toString()),
      surcharges: parseFloat(obj.surcharges.toString()),
      discounts: parseFloat(obj.discount.toString()),
      taxes: parseFloat(
        obj.impuestos.translados.Importe
          ? obj.impuestos.translados.Importe.toString()
          : '0.00',
      ),
      data: obj.detalles,
      total: parseFloat(obj.total.toString()),
    };
  } else {
    return {
      subtotal: 0.0,
      surcharges: 0.0,
      discounts: 0.0,
      taxes: 0.0,
      data: [],
      total: 0.0,
    };
  }
};

const ConceptsTotals = (payload: {
  payment: Payment;
  details: any[];
  type: InvoiceModules;
  ivaDefault?: number;
  ivaByDetail?: number;
  baseDefault?: number;
}) => {
  const {
    payment,
    details,
    type,
    ivaDefault = 1.16,
    ivaByDetail = 0.16,
    baseDefault = 0,
  } = payload;
  //const pago = payment.quantity - payment.change;
  let resultad = {
    total: 0,
    subtotal: 0,
    discount: 0,
    surcharges: 0,
    detalles: [],
    impuestos: {
      translados: {
        Base: 0,
        Importe: 0,
      },
    },
  };
  if (details.length > 0) {
    const concepts: Concept[] = details.map((d: any) => {
      return getConcept(d, type);
    });

    const { detailsWithoutPaymentApplied } = calculateInvoicePrices({
      payment: {
        amount: payment.amount,
        change: payment.change,
      },
      concepts,
      fountType:
        type == InvoiceModules.ACADEMY
          ? FountTypeEnum.DISCOUNT_ON_DISCOUNT
          : FountTypeEnum.TRADITIONAL,
      ivaPercentage:
        type == InvoiceModules.SCHOOL
          ? TaxPercentageEnum.T0
          : TaxPercentageEnum.T16,
    });

    const totals = detailsWithoutPaymentApplied;

    let surchargesTotal: Decimal[] = [];
    totals.concepts.forEach((c: Concept) => {
      c.charges.forEach((cc: Charge) => {
        if (cc.id == SystemTypeExtraChargesEnum.Recargos) {
          surchargesTotal.push(
            c.chargeWithIVA ? c.chargeWithIVA : new Decimal(0.0),
          );
        }
      });
    });

    resultad.detalles = totals.concepts ? totals.concepts : [];
    (resultad.discount = totals.discount
      ? parseFloat(totals.discount.toFixed(2))
      : 0.0),
      (resultad.impuestos = {
        translados: {
          Base: totals.baseTax ? parseFloat(totals.baseTax.toFixed(2)) : 0.0,
          Importe: totals.tax ? parseFloat(totals.tax.toFixed(2)) : 0.0,
        },
      });
    resultad.subtotal = totals.amount
      ? parseFloat(totals.amount.toFixed(2))
      : 0.0;
    (resultad.surcharges =
      surchargesTotal.length > 0
        ? parseFloat(Decimal.sum(...surchargesTotal).toFixed(2))
        : 0.0),
      (resultad.total = totals.total
        ? parseFloat(totals.total.toFixed(2))
        : 0.0);
  }
  return resultad;
};

const getConcept = (concept: any, type: InvoiceModules) => {
  const charges: Charge[] = concept?.extraCharges?.map((e: ExtraCharges) => {
    let order = 1;
    if (
      type == InvoiceModules.ACADEMY &&
      e.typeExtraCharge == SystemTypeExtraChargesEnum.Becas
    ) {
      order = 1;
    } else if (
      type == InvoiceModules.ACADEMY &&
      e.typeExtraCharge == SystemTypeExtraChargesEnum.Descuentos
    ) {
      order = 2;
    } else if (
      type == InvoiceModules.ACADEMY &&
      e.typeExtraCharge == SystemTypeExtraChargesEnum.Recargos
    ) {
      order = 3;
    }
    return {
      id: e.typeExtraCharge,
      amount: e.quantity,
      order,
      type:
        e.typeExtraCharge != SystemTypeExtraChargesEnum.Recargos
          ? ChargeTypeEnum.DISCOUNTS
          : ChargeTypeEnum.SURCHARGES,
      application:
        e.applicationType == TypeChargeApplicationEnum.percentage
          ? ChargeApplicationEnum.PERCENTAGE
          : ChargeApplicationEnum.QUANTITY,
    } as Charge;
  });

  return {
    id: concept.id,
    quantity: concept?.quantity || 1,
    basePrice: getPrice(concept, type),
    name: '',
    charges,
  };
};

const getPrice = (detail: any, type: InvoiceModules): number => {
  if (type == InvoiceModules.STORE) {
    return detail?.priceWithIVA || 0;
  } else {
    return typeof detail?.price == 'string'
      ? parseFloat(`${detail?.price || 0}`)
      : detail?.price || 0;
  }
};

export const validValue = (arraySum: any[]): number => {
  let value = 0;
  if (arraySum.length != 0) {
    if (arraySum.length == 1) {
      value = Decimal.add(value, arraySum[0]).toNumber();
    } else {
      value = Decimal.sum(value, ...arraySum).toNumber();
    }
  }
  return value;
};

export const reportPaymentByClient = (data: any[]) => {
  const dataClient = [];
  data.forEach((d: any) => {
    const index = dataClient.findIndex((dd) => d.a_id == dd.a_id);
    if (index > -1) {
      dataClient[index].p_income = Decimal.sum(
        dataClient[index].p_income,
        d.p_income,
      ).toNumber();
      dataClient[index].count = Decimal.sum(
        dataClient[index].count,
        1,
      ).toNumber();
    } else {
      dataClient.push({ ...d, count: 1 });
    }
  });
  return dataClient;
};

export const dataFullSale = (value: any[], type: InvoiceModules) => {
  const data = getDataCharges(value, type, true).map((d) => {
    const totalsPayments = new Decimal(
      d.p_total_without_current != null ? d.p_total_without_current : 0,
    ).toNumber();
    const subtotalSale = saleDetailsCalculations({
      details: d.sale_details,
      type: InvoiceModules.SCHOOL,
    }).total;
    // 1 pagado // 2 incompleto con pagos // no pagado
    if (totalsPayments == subtotalSale) {
      d.p_status_Global = 1;
    } else {
      d.p_status_Global = totalsPayments > 0 ? 2 : 3;
    }
    return d;
  });

  const result = [];
  data.forEach((d) => {
    let array_details_names = [];
    const detailsConvert = [];
    d.details_names != null
      ? (array_details_names = d.details_names.split(','))
      : [];

    array_details_names.forEach((e) => {
      const detail_name = e.split(';');
      const index = detailsConvert.findIndex((ee) => ee.id == detail_name[0]);
      if (index == -1) {
        detailsConvert.push({
          id: detail_name[0],
          name: detail_name[1],
        });
      }
    });
    d.sale_details.forEach((sd) => {
      const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
        payment: {
          change: 0,
          quantity: saleDetailsCalculations({
            details: [sd],
            type,
          }).total,
        },
        details: [sd],
        type,
        typeConcept: 'Recepit',
      });

      const concepts =
        type == InvoiceModules.STORE
          ? invoiceDetails.concepts.conceptsMiniStore
          : invoiceDetails.concepts.conceptsSchoolAndAcademy;
      const objDetail = detailsConvert.find((d) => d.id == sd.id);
      result.push({
        ...d,
        sale_details: [sd],
        concept: {
          quantity: parseFloat(sd.quantity),
          price: parseFloat(sd.priceWithIVA),
          name: objDetail.name,
          import: Decimal.mul(sd.quantity, sd.priceWithIVA).toNumber(),
        },
        p_income: Decimal.sum(
          invoiceDetails.totals.receipt.Impuesto,
          Decimal.sub(
            invoiceDetails.totals.receipt.SubTotal,
            invoiceDetails.totals.fiscal.Descuento,
          ),
        ).toNumber(),
        v_status: parseInt(`${d.v_status}`),
        charges: {
          scholarships: validValue(
            type != InvoiceModules.STORE
              ? concepts.map((c: ConceptSchoolAndAcademy) => c.beca)
              : [],
          ),
          discounts: validValue(
            concepts.map((c: ConceptSchoolAndAcademy) => c.descuento),
          ),
          surcharges: validValue(
            concepts.map((c: ConceptSchoolAndAcademy) => c.recargo),
          ),
        },
        totals: {
          IVA: invoiceDetails.totals.receipt.Impuesto,
          totalWithoutIVA: Decimal.sub(
            invoiceDetails.totals.receipt.SubTotal,
            invoiceDetails.totals.fiscal.Descuento,
          ).toNumber(),
        },
      });
    });
  });
  return result;
};
