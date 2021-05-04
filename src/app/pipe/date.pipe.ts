import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fullDate'
})
export class DatePipe implements PipeTransform {

  transform(value:any ) {
    if(value){
      return moment(value).format('DD/MM/yyyy');
    }
  }

}
