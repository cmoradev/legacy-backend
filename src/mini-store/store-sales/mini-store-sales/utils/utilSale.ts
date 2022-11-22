import { NotInvoiced } from '../../../../common/interface/not-invoiced.interface';
import { Decimal } from '@munyaal/calculations';

export const reportStoreSaleByClient = (
    data: NotInvoiced[]
) => {
    const dataClient: NotInvoiced[] = [];
    data.forEach((d: any) => {
        const index = dataClient.findIndex((dd) => d.a_id == dd.a_id);
        if (index > -1) {
            dataClient[ index ].totalIVA = Decimal.sum(dataClient[ index ].totalIVA, d.totalIVA).toNumber();
            dataClient[ index ].count = Decimal.sum(dataClient[ index ].count, 1).toNumber();
        } else {
            dataClient.push({ ...d, count: 1 });
        }
    })
    return dataClient;
}
