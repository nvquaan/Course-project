import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value:any ) {
    if(value){
      return value=='male'?'Nam':value=='female'?'Nữ':'Chưa xác định';
    }
  }

}
