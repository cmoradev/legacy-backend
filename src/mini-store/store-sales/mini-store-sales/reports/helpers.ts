import * as Moment from 'moment';
import { getNameStatusConcept } from '../../../../school-colegio-ingles/school-payments/report/helpers';
import { IQueryReportSaleToday } from '../types/IReport';

export const getNameReport = (label: string, data: IQueryReportSaleToday, isInvoice: boolean = false): {excel: string, title: string} =>{
  let nameE = ''+label;
  let name = ''+label;
  if(data.status){
    nameE += `_${isInvoice ? ' ': getNameStatusConcept(parseInt(`${data.status}`))}`
    name += ` ${isInvoice ? ' ': getNameStatusConcept(parseInt(`${data.status}`))}`
  }
  nameE+=`${getRangeDates(data.startDate, data.endDate).excel}`
  name+=` ${getRangeDates(data.startDate, data.endDate).title}`
  return {excel: nameE, title: name};
}

export const getRangeDates = (startDate: string, endDate: string): {excel: string, title: string} =>{
  const x  = Moment(startDate).add(5, 'hours');
  const y  = Moment(endDate);
  return {
    excel: `_${x.date()}${x.month()+1}${x.year()}_${y.date()}${y.month()+1}${y.year()}`,
    title: ` ${Moment(startDate).format('L')} - ${Moment(endDate).format('L')}`
  }
}