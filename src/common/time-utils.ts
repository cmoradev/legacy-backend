import * as moment from 'moment';
import { Moment } from 'moment';

export enum TypeFilterDate {
    Day = 'day',
    Week = 'week',
    Hour = 'hour',
    Month = 'month',
    Year = 'year',
    Total = 'total',
}
export type DateQueryObject = { dateEnd: Moment; dateStart: Moment; } | null;
export interface OptionsDateTime { filter: TypeFilterDate; calculateDates?: { dateStart: Date | string; dateEnd: Date | string };  }

export function getDates({ filter }: OptionsDateTime): DateQueryObject {
    if (filter === TypeFilterDate.Total) { return null; }
    const dateEnd = moment().endOf(filter);
    const dateStart = moment().startOf(filter);
    return {
        dateEnd,
        dateStart,
    };
}
