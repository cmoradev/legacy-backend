import { MiniStoreSale } from '../entities/mini-store-sale.entity';
import { MiniStoreSaleDetail } from '../../mini-store-sales-details/entities/mini-store-sale-detail.entity';
import { add } from 'exact-math';
import { totalAmountConceptAfterExCharge } from '../../../../common/point-of-sale/miniStore-point-of-sale';

export function totalForProducts(sales: MiniStoreSale[]) {
    const products: MiniStoreSaleDetail[] = [];
    for (const sale of sales) {
        for (const detail of sale.miniStoreSaleDetails) {
            products.push(detail);
        }
    }
    const helper = {};
    return products.reduce((r, o) => {
        const key = o.productName;

        if (!helper[key]) {
            const item = { ...o };
            delete item.quantity;
            helper[key] = Object.assign({ total: 0, quantity: 0 }, item); // create a copy of o
            r.push(helper[key]);
        }
        console.log(totalAmountConceptAfterExCharge(o));
        helper[key].quantity = add(helper[key].quantity, o.quantity);
        helper[key].total = add(helper[key].total, totalAmountConceptAfterExCharge(o));

        return r;
    }, []);

}

export function totalForCategory(sales: MiniStoreSale[]) {
    for (const sale of sales) {

    }
}
