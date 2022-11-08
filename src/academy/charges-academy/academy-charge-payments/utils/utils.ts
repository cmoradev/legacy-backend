import {NotInvoiced} from '../../../../common/interface/not-invoiced.interface';
import {Decimal} from '@munyaal/calculations';

export const reportAcademiaPaymentByClient = (
    data: NotInvoiced[]
) => {
    const dataClient: NotInvoiced[] = [];
    data.forEach((d: any) => {
        const index = dataClient.findIndex((dd) => d.a_key == dd.a_key);
        if (index > -1) {
            dataClient[index].p_quantity.push(...d.p_quantity);
            dataClient[index].p_income = Decimal.sum(dataClient[index].p_income, d.p_income).toNumber();
            dataClient[index].count = Decimal.sum(dataClient[index].count, 1).toNumber();
        } else {
            dataClient.push({...d, count: 1});
        }
    })
    return dataClient;
}