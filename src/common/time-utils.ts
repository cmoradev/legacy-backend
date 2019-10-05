import * as moment from 'moment';
import { Moment } from 'moment';

export enum TypeFilterDate {
    Day = 'days',
    Week = 'week',
    Hour = 'hour',
    Month = 'month',
    Year = 'year',
    Total = 'total',
}
export type DateQueryObject = { dateEnd: Moment; dateStart: Moment; } | null;

export function getYear(): DateQueryObject {
    const yearNow = moment().get('year');
    const yearNowDate = moment().year(yearNow);
    const yearPastDate = moment().year(yearNow).set('date', 1).set('month', 0).set('hour', 0).set('minute', 0).set('second', 0);
    return { dateEnd: yearNowDate, dateStart: yearPastDate };
}
export function getMonth(): DateQueryObject {
    const monthNow = moment().get('month');
    const monthNowDate = moment().month(monthNow);
    const monthPastDate = moment().month(monthNow).set('date', 1).set('hour', 0).set('minute', 0).set('second', 0);
    return { dateEnd: monthNowDate, dateStart: monthPastDate };
}
export function getWeek(): DateQueryObject {
    const weekNow = moment().get('week');
    const weekNowDate = moment().week(weekNow);
    const weekPastDate = moment().week(weekNow).subtract(1, 'week').set('hour', 0).set('minute', 0).set('second', 0);
    return { dateEnd: weekNowDate , dateStart: weekPastDate };
}
export function getDay(): DateQueryObject {
    const dayNow = moment().get('day');
    const dayNowDate = moment().day(dayNow);
    const dayPastDate = moment().day(dayNow).subtract(1, 'day').set('hour', 0).set('minute', 0).set('second', 0);
    return { dateEnd: dayNowDate, dateStart: dayPastDate };
}
export function getHour(): DateQueryObject {
    const hourNow = moment().get('hour');
    const hourNowDate = moment().day(hourNow);
    const hourPastDate = moment().day(hourNow).subtract(1, 'hour').set('minute', 0).set('second', 0);
    return { dateEnd: hourNowDate, dateStart: hourPastDate };
}
