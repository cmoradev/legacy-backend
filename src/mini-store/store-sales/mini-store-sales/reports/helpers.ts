import { IQueryReportSaleToday } from '../types/IReport';
import * as Moment from 'moment';
import { getNameStatusConcept } from '../../../../school-colegio-ingles/school-payments/report/helpers';

export const getNameReport = (label: string, data: IQueryReportSaleToday): {excel: string, title: string} =>{
  let nameE = ''+label;
  let name = ''+label;
  if(data.status){
    nameE += `_${getNameStatusConcept(parseInt(`${data.status}`))}`
    name += ` ${getNameStatusConcept(parseInt(`${data.status}`))}`
  }
  const x  = Moment(data.startDate);
  nameE+=`_${x.date()}${x.month()+1}${x.year()}`
  name+=` ${Moment(data.startDate).format('L')}`
  const y  = Moment(data.endDate);
  nameE+=`_${y.date()}${y.month()+1}${y.year()}`
  name+=` - ${Moment(data.endDate).format('L')}`
  return {excel: nameE, title: name};
}