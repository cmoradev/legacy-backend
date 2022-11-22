import {IReportSaleTodayRow} from '../types/IReport';
import {Decimal} from '@munyaal/calculations';

export const reportSaleTodayByClient = (
    data: IReportSaleTodayRow[]
) => {
    const dataClient: IReportSaleTodayRow[] = [];
    data.forEach((d: any) => {
        const index = dataClient.findIndex((dd) => d.studentId == dd.studentId);
        if (index > -1) {
            dataClient[index].idsPagos.push(...d.idsPagos)
            dataClient[index].idsDetalles.push(...d.idsDetalles)
            dataClient[index].TotalDetalles = Decimal.sum(dataClient[index].TotalDetalles, d.TotalDetalles).toNumber()
            dataClient[index].countSale = Decimal.sum(dataClient[index].countSale, 1).toNumber();
        } else {
            dataClient.push({...d, countSale: 1});
        }
    })
    return dataClient;
}
