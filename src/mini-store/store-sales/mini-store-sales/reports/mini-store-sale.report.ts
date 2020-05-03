import { MiniStoreSale } from '../entities/mini-store-sale.entity';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { add, mul, round, sub } from 'exact-math';
import { totalAmountConceptAfterExCharge } from '../../../../common/point-of-sale/miniStore-point-of-sale';
import { MiniStoreSalePayment } from '../../mini-store-sales-payments/entities/mini-store-sale-payment.entity';

export function totalForProducts(sales: MiniStoreSale[]) {
    const products: MiniStoreSaleDetail[] = [];
    for (const sale of sales) {
        for (const detail of sale.miniStoreSaleDetails) {
            products.push(detail);
        }
    }
    const helper = {};
    const prod = products.reduce((r, o) => {
        const key = o.productName;

        if (!helper[key]) {
            const item = { ...o };
            delete item.quantity;
            helper[key] = Object.assign({ total: 0, quantity: 0 }, item); // create a copy of o
            r.push(helper[key]);
        }
        helper[key].quantity = add(helper[key].quantity, o.quantity);
        helper[key].total = add(helper[key].total, totalAmountConceptAfterExCharge(o));

        return r;
    }, []);
    return prod.reduce((preValue, curValue, i) => {
        preValue[i] = {
            name: curValue.productName,
            quantity: curValue.quantity,
            unitMeasurement: curValue.unitMeasurement,
            total: curValue.total,
        };
        return preValue;
    }, []);
}

export function totalForCategory(sales: MiniStoreSale[]) {
    const products: MiniStoreSaleDetail[] = [];
    for (const sale of sales) {
        for (const detail of sale.miniStoreSaleDetails) {
            products.push(detail);
        }
    }
    const helper = {};
    const prod = products.reduce((r, o) => {
        const key = o.miniStoreClassification.id;

        if (!helper[key]) {
            const item = { ...o };
            delete item.quantity;
            helper[key] = Object.assign({
                total: 0, unit: [
                    { id: 1, name: 'Kilogramos', unit: 'Kg(s)', quantity: 0, total: 0 },
                    { id: 6, name: 'Pieza', unit: 'pza(s)', quantity: 0, total: 0 },
                    { id: 8, name: 'Litros', unit: 'L', quantity: 0, total: 0 },
                ],
            }, item); // create a copy of o
            r.push(helper[key]);
        }
        const index = helper[key].unit.findIndex((unit) => unit.id === o.unitMeasurement);
        helper[key].unit[index].quantity = add(helper[key].unit[index].quantity, o.quantity);
        helper[key].unit[index].total = add(helper[key].unit[index].total, totalAmountConceptAfterExCharge(o));
        helper[key].total = add(helper[key].total, totalAmountConceptAfterExCharge(o));

        return r;
    }, []);
    return prod.reduce((preValue, curValue, i) => {
        preValue[i] = {
            name: curValue.miniStoreClassification.name,
            unit: curValue.unit,
            total: curValue.total,
        };
        return preValue;
    }, []);
}

export function totalForCashier(payments: MiniStoreSalePayment[]) {

    const paymentesSales: Array<{
        id: number;
        name: string;
        change: string;
        quantity: string;
        methods: Array<{
            id: number;
            name: string;
            quantity: string;
        }>
    }> = payments.reduce((preValue, curValue, i) => {
        preValue[i] = {
            id: curValue.agent.id,
            name: curValue.agent.name,
            change: curValue.change,
            quantity: curValue.quantity,
            methods: curValue.miniStoreSaleMethodPayments.reduce((pre, cur, j) => {
                pre[j] = {
                    id: cur.invoiceMethod.id,
                    name: cur.invoiceMethod.name,
                    quantity: cur.invoiceMethod.id === 1 ? sub(cur.quantity, curValue.change) : cur.quantity,
                };
                return pre;
            }, []),
        };
        return preValue;
    }, []);

    const helper = {};
    const groupBy = paymentesSales.reduce((r, o) => {
        const key = o.id;

        if (!helper[key]) {
            const item = { ...o };
            delete item.quantity;
            delete item.change;
            item.methods = [];
            helper[key] = Object.assign({
                total: 0,
            }, item); // create a copy of o
            r.push(helper[key]);
        }
        for (const method of o.methods) {
            const index = helper[key].methods.findIndex((m) => m.id === method.id);
            if (index > -1) {
                helper[key].methods[index].quantity = round(add(helper[key].methods[index].quantity, method.quantity), -2, {
                    returnString: true,
                    trim: false,
                });
                helper[key].total = round(add(helper[key].total, method.quantity), -2, {
                    returnString: true,
                    trim: false,
                });
            } else {
                helper[key].methods.push(method);
                helper[key].total = round(add(helper[key].total, method.quantity), -2, {
                    returnString: true,
                    trim: false,
                });
            }
        }
        return r;
    }, []);
    return groupBy;
}
