import * as Moment from 'moment';

export function formatDate(date: string | Date, format: string = 'DD/MM/YY') {
    return Moment(date).format(format);
}

export function getDaysArray(year, month, lang: string = 'en'): DaysOFMonths[] {
    const monthIndex = month - 1;
    const names = lang === 'en' ? ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] : ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const date = new Date(year, monthIndex, 1);
    const result = [];
    while (date.getMonth() === monthIndex) {
        const daySchedule = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const monthSchedule = month < 10 ? '0' + month : month;
        result.push({
            day: names[date.getDay()],
            dayNum: date.getDate(),
            date: daySchedule + '/' + monthSchedule + '/' + year,
        });
        // result.push(date.getDate() + '-' + names[date.getDay()]);
        date.setDate(date.getDate() + 1);
    }
    return result;
}

export interface DaysOFMonths {
    day: string;
    dayNum: string;
    date: string;
}