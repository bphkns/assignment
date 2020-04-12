import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

@Pipe({
    name: 'datePipe'
})
export class DatePipe implements PipeTransform {
    transform(value: string): string {
        const sameWeek = moment(value).isSame(new Date(), 'week');
        const today = moment(value).isSame(new Date(), 'day');

        if (today) {
            return moment(value).format('hh:mm A');
        }

        if (sameWeek) {
            return moment(value).format('dddd');
        }



        return moment(value).format('MM/DD/YYYY');
    }

}
