import { isSameMonth, format, addMonths, isBefore, startOfMonth, endOfMonth } from 'date-fns';
import { es } from 'date-fns/locale/es'

/*
 * Agrupa un arreglo con la propiedad especificada
 * */
export const groupBy = <T>(
  arr: T[],
  getProperty: (value: T) => string,
): { [property: string]: T[] } => {
  return arr.reduce((result, item) => {
    const key = getProperty(item);

    if (!result[key]) result[key] = [];

    result[key].push(item);

    return result;
  }, {} as { [key: string]: T[] });
};

export interface MonthDate {
  name: string;
  month: string;
  year: string;
  date: string;
}

export function getMonthsBetweenDate(startDate: Date, endDate: Date): MonthDate[] {
  const months: MonthDate[] = [];

  let currentDate = startDate;

  // Recorremos el rango mes por mes
  while (isBefore(currentDate, endDate) || format(currentDate, 'yyyy-MM') === format(endDate, 'yyyy-MM')) {
    // Formateamos la fecha para obtener el mes y año en el formato deseado
    months.push({
      name: format(currentDate, 'MMMM', { locale: es }).toUpperCase(),
      month: format(currentDate, 'MM'),
      year: format(currentDate, 'yyyy'),
      date: format(currentDate, 'yyyy-MM')
    });

    // Pasamos al siguiente mes
    currentDate = addMonths(currentDate, 1);
  }

  months.shift();

  return months;

}


