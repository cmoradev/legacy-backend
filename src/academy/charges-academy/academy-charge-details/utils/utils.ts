import { Decimal } from '@munyaal/calculations';
import {NotInvoiced} from '../../../../common/interface/not-invoiced.interface';

export const reportAcademiaSaleByClient = (
    data: NotInvoiced[]
) => {
    const dataClient: NotInvoiced[] = [];
    data.forEach((d: any) => {
        const index = dataClient.findIndex((dd) => d.a_id == dd.a_id);
        if (index > -1) {
            dataClient[ index ].total = Decimal.sum(dataClient[ index ].total, d.total).toNumber();
            dataClient[ index ].count = Decimal.sum(dataClient[ index ].count, 1).toNumber();
        } else {
            dataClient.push({ ...d, count: 1 });
        }
    })
    return dataClient;
}
