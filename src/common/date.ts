import * as Moment from 'moment';

export function formatDate(date: string | Date, format: string = 'DD/MM/YY') {
  return Moment(date).format(format);
}
