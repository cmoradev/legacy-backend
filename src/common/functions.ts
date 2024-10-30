import { isSameMonth, format, addMonths, isBefore, lightFormat, getYear, getMonth, getDay } from 'date-fns';
import { es } from 'date-fns/locale/es'
import { AmountAndTaxParams, Decimal } from '@munyaal/calculations';

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

export function getMonthsBetweenDate(startDate: string, endDate: string): MonthDate[] {
  const [startYear, startMonth, startDay] = startDate.split('-');
  const [endYear, endMonth, endDay] = endDate.split('-');
  const months: MonthDate[] = [];
  
  const startDayUtc = new Date(
    parseInt(startYear),
    parseInt(startMonth)-1,
    parseInt(startDay)
  );

  const endDayUtc = new Date(
    parseInt(endYear),
    parseInt(endMonth)-1,
    parseInt(endDay)
  );

  
  let currentDate = startDayUtc;

  // Recorremos el rango mes por mes
  while (isBefore(currentDate, endDayUtc) || (isSameMonth(currentDate, endDayUtc) && !isBefore(currentDate, endDayUtc))) {
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
  return months;

}

/**
 * Obtiene el monto y el impuesto de un precio con IVA.
 * @param {Object} params - Parámetros de entrada para obtener el monto y el impuesto.
 * @returns {Object} - Monto y impuesto calculados.
 * Ejemplo: getAmountAndTaxFromPriceWithIva({ base, ivaPercentage })
 */
export const getPriceWithIva = (params: AmountAndTaxParams) => {
  const base = new Decimal (params.base);

  const percentage = params.ivaPercentage > 1 ? new Decimal(params.ivaPercentage).div(100).add(1) : new Decimal(params.ivaPercentage).add(1);

  const amount = base.div(percentage);

  const tax = base.sub(amount);

  return {
      base,
      amount,
      tax
  }
}